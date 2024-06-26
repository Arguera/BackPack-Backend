const User = require('../models/User.model');
const { roles: ROLES } = require('../data/configuration.constants.json');

const { createToken, verifyToken } = require('../utils/jw.tools');

const controller = {};

controller.register = async (req, res, next) => {
  try {
      // Obtener la info
      const { carnet, name, lastname, email, degree, password} = req.body;

      // Verificar la existencia del correo y el user
      const user =
        await User.findOne({ $or: [{carnet: carnet}, {email: email}] })

      if(user) {
        return res.status(409).json({ error: 'User already exists!' })
      }

      // Si no existe lo creamos
      const newUser = new User({
        carnet: carnet,
        name: name,
        lastname: lastname,
        email: email,
        degree: degree,
        password: password,
        roles: [ROLES.USER]
      });

      await newUser.save();

      return res.status(201).json({ message: 'User registered' });
  } catch (error) {
    next(error);
  }
}

controller.login = async (req, res, next) => {
  try {
    // Obtener la info -> identificador, password
    const { identifier, password } = req.body;

    // Verificar si el usuario existe
    const user = 
      await User.findOne({ $or: [{carnet: identifier}, {email: identifier}] })

    // Si no existe -> 404
    if(!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Si existe verificamos la password
    // Si la password no coincide -> 401
    if(!user.comparePassword(password)) {
      return res.status(401).json({ error: 'Incorrect password' })
    } 

    // Si la password coincide -> Loggeamos 
    // Crear un token 
    const token = await createToken(user._id);

    // Almacenar token
    // Verificar la integridad de los tokens actuales - max 5 sesiones
    let _tokens = [...user.tokens];
    const _verifyPromises = _tokens.map(async (_t) => {
      const status = await verifyToken(_t);
      
      return status ? _t : null;
    });

    _tokens = (await Promise.all(_verifyPromises))
      .filter(_t => _t)
      .slice(0, 4);

    _tokens = [token, ..._tokens];
    user.tokens = _tokens;

    await user.save();
    // Devolver token
    return res.status(200).json({ token })
  } catch (error) {
    next(error);
  }
}

controller.whoami = async (req, res, next) => {
  try {
    const { _id, carnet, name, lastname, email, degree, roles } = req.user;
    return res.status(200).json({
      _id, carnet, name, lastname, email, degree, roles
    })
  } catch (error) {
    next(error); 
  }
}

module.exports = controller;