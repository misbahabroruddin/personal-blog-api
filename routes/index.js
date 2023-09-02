const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const authRouter = require('./auth');

router.use('/auth', authRouter);
router.use(authMiddleware);

module.exports = router;
