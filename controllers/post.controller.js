const Post = require('../models/Post.model');
const postService = require('../services/post.service'); 

const debug = require('debug')('app:post-controller');

const controller = {}; 

controller.save = async (req, res, next) => {
  try {
    const postSaved = await postService.save(req);

    return res.status(201).json(postSaved);
  } catch (error) {
    next(error);
  }
}

controller.findAll = async (req, res, next) => {
  try {
    const posts = await Post.find({ hidden: false })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('likes', 'carnet name lastname email degree')
      .populate('comments.user', 'carnet name lastname email degree');

    return res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
}

controller.findOneById = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    
    // Verificar si esta visible
    const post = 
      await Post.findOne({ _id: identifier, hidden: false })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('likes', 'carnet name lastname email degree')
      .populate('comments.user', 'carnet name lastname email degree');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

controller.findByUser = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const posts = 
      await Post.find({ user: identifier, hidden: false })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('likes', 'carnet name lastname email degree')
      .populate('comments.user', 'carnet name lastname email degree');

    return res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
}

controller.findOwn = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;

    const posts = await Post.find({ user: userId })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('likes', 'carnet name lastname email degree')
      .populate('comments.user', 'carnet name lastname email degree');
    
    return res.status(200).json({ posts });
  } catch (error) {
    next(error);
  }
}

controller.findBySubject = async (req, res, next) => {
  try {
    const { identifier } = req.params;

    const post =
      await Post.find({ subject: identifier, hidden: false })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('likes', 'carnet name lastname email degree')
      .populate('comments.user', 'carnet name lastname email degree');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({ posts: post });
  } catch (error) {
    next(error);
  }
}

controller.findSavedPosts = async (req, res, next) => {
  try {
    const user = 
      await (req.user)
      .populate({
        path: 'savedPosts',
        populate: [
          {
            path: 'subject',
            select: 'code name image'
          },
          {
            path: 'user',
            select: 'carnet name lastname email degree'
          },
          {
            path: 'likes',
            select: 'carnet name lastname email degree'
          },
          {
            path: 'comments.user',
            select: 'carnet name lastname email degree'
          }
        ]
      });

    return res.status(200).json({ posts: user['savedPosts'] });
  } catch (error) {
    next(error);
  }
}

controller.deleteById = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { user } = req;

    const post = await Post.findOneAndDelete({ _id: identifier, user: user._id });

    if(!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}

controller.toggleHidden = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const user = req.user;

    // Obtener el post
    // Verificamos la pertenencia del post al usuario 
    const post = await Post.findOne({ _id: identifier, user: user._id })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('likes', 'carnet name lastname email degree')
      .populate('comments.user', 'carnet name lastname email degree');

    if(!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    
    // Cambiamos el valor
    post.hidden = !post.hidden;

    // Commit a los cambios
    const newPost = await post.save();
    return res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
}

controller.likeAPost = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const user = req.user;

    // Obtener el post
    // Verificamos la pertenencia del post al usuario 
    const post = 
      await Post.findOne({ _id: identifier, hidden: false })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('comments.user', 'carnet name lastname email degree');

    if(!post) {
      return res.status(404).json({ error: 'Post not found' })
    }
    
    // Dar like o dislike
    let _likes = post['likes'] || [];
    const alreadyLike = _likes.findIndex(_i => _i.equals(user._id)) >= 0;

    if(alreadyLike) {
      _likes = _likes.filter(_i => !_i.equals(user._id));
    } else {
      _likes = [user._id, ..._likes];
    }

    post['likes'] = _likes;
    // Commit a los cambios
    const newPost = 
      await (await post.save())
      .populate('likes', 'carnet name lastname email degree');
    return res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
}

controller.saveAPost = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const user = req.user;

    // Obtener el post  
    // Verificamos la pertenencia del post al usuario 
    const post = await Post.findOne({ _id: identifier, hidden: false });

    if(!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    let _posts = user['savedPosts'] || [];
    const alreadySave = _posts.findIndex(_i => _i.equals(post._id)) >= 0;

    if(alreadySave) {
      _posts = _posts.filter(_i => !_i.equals(post._id));
    } else {
      _posts = [post._id, ..._posts];
    }

    // Commit a los cambios
    user['savedPosts'] = _posts;
    const newUser = 
      await (await user.save())
      .populate({
        path: 'savedPosts',
        populate: [
          {
            path: 'subject',
            select: 'code name image'
          },
          {
            path: 'user',
            select: 'carnet name lastname email degree'
          },
          {
            path: 'likes',
            select: 'carnet name lastname email degree'
          },
          {
            path: 'comments.user',
            select: 'carnet name lastname email degree'
          }
        ]
      });

    return res.status(200).json({ posts: newUser['savedPosts'] });
  } catch (error) {
    next(error);
  }
}

controller.saveComment = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const { content, _id: commentId } = req.body;
    const user = req.user;

    // Obtener le post (id, hidden)
    const post = 
      await Post.findOne({ _id: identifier, hidden: false })
      .populate('subject', 'code name image')
      .populate('user', 'carnet name lastname email degree')
      .populate('likes', 'carnet name lastname email degree');

    // Verificar que el post exista
    if(!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Buscamos la existencia de un comentario previo (commentId)
    let _comments = post['comments'];

    const prevIndex = _comments.findIndex(_c => _c._id.equals(commentId));
    if(prevIndex >= 0) {
      // El comentario existe
      const _comment = _comments[prevIndex];
      _comment.history = [..._comment.history, _comment.content];
      _comment.content = content;

      _comments[prevIndex] = _comment;
    } else {
      // El comentario no existe 
      _comments = [..._comments, { user: user._id, timestamp: new Date(), content }];
    }
   

    // Guardamos el post -> Commit
    post['comments'] = _comments;
    const newPost = 
      await (await post.save())
      .populate('comments.user', 'carnet name lastname email degree');

    // Retornamos el post actualizado
    return res.status(200).json(newPost);
  } catch (error) {
    next(error);
  }
}

module.exports = controller;  