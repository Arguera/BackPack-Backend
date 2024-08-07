const express = require('express');
const router = express.Router();

const postRouter = require('./post.router');
const authRouter = require('./auth.router');
const subjectRouter = require('./subject.router');
const reportRouter = require('./report.router');
const degreeRouter = require('./degree.router');

// /api/...
router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/subject', subjectRouter);
router.use('/report', reportRouter);
router.use('/degree', degreeRouter);

module.exports = router;