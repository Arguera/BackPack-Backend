const debug = require('debug')('app:auth-middleware');
const { verifyToken } = require('../utils/jw.tools');
const User = require('../models/User.model');

const { roles: ROLES } = require('../data/configuration.constants.json')

const middlewares = {};
const PREFIX = 'Bearer';

middlewares.authentication = async (req, res, next) => {
  try {
    // debug('User authentication');
    // 01 - Verificar el authorization
    const { authorization } = req.headers;

    if(!authorization) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // 02 - Verificar la validez del token
    // Token -> Bearer kfdj;askfjd;adfaldshfajshfdlkajskdfjaskj
    const [prefix, token] = authorization.split(' ');
    
    if(prefix !== PREFIX) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    if(!token) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const payload = await verifyToken(token);

    if(!payload) {
      return res.status(401).json({ error: 'User not authenticated' })
    }

    const userId = payload['sub'];

    // 03 - Verificar el usuario
    const user = await User.findById(userId);

    if(!user) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // 04 - Comparar el token con los tokens 
    const isTokenValid = user.tokens.includes(token);
    if(!isTokenValid) {
      return res.status(401).json({ error: 'User not authenticated' })
    }

    // 05 - Modificar la req, para añadir la info del usuario
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
}

middlewares.authorization = (roleRequired = ROLES.SYSADMIN) => {
  return (req, res, next) => {
    // Premisa: Debe de haber pasado por la autenticación
    try {
      const { roles=[] } = req.user;
      
      // Verificamos si el rol requerido esta en la colección
      const isAuth = roles.includes(roleRequired);
      const isSysadmin = roles.includes(ROLES.SYSADMIN);

      // Si no está -> 403
      if(!isAuth && !isSysadmin) {
        return res.status(403).json({ error: 'Forbidden' })
      }

      // Si está -> next 
      next();
    } catch (error) {
      next(error);
    }
  } 
}

module.exports = middlewares;