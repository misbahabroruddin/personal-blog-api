const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const authRouter = require('./auth');
const getRouter = require('./get');
const CommentController = require('../controllers/comment.controller');
const PostController = require('../controllers/post.controller');

router.use('/auth', authRouter);
router.post('/comments', CommentController.create);
router.get('/post', PostController.getAll);
router.get('/post/:id', PostController.getId);
router.use(authMiddleware);
router.delete('/comments/:id', CommentController.delete);
router.post('/post', PostController.create);
router.put('/post/:id', PostController.update);
router.put('/post/:id', PostController.delete);

module.exports = router;
