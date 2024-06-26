const express = require('express');
const router = express.Router();

const postRouter = require('./post.router');
const authRouter = require('./auth.router');
const subjectRouter = require('./subject.router');

// /api/...
router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/subject', subjectRouter);

module.exports = router;