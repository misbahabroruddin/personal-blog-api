const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const authRouter = require('./auth');
const upload = require('./../middlewares/uploadImage');
const CommentController = require('../controllers/comment.controller');
const PostController = require('../controllers/post.controller');

router.use('/auth', authRouter);
router.post('/comments', CommentController.create);
router.get('/posts', PostController.getAll);
router.get('/posts/:id', PostController.getId);
router.use(authMiddleware);
router.delete('/comments/:id', CommentController.delete);
router.post('/posts', upload.single('thumbnail_url'), PostController.create);
router.put('/posts/:id', PostController.update);
router.delete('/post/:id', PostController.delete);

module.exports = router;
