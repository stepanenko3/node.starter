const express = require('express');
const router = express.Router();

const AppRouter = require('./app');
const AuthRouter = require('./auth');
const ProductRouter = require('./product');
const WebSocketsRouter = require('./ws');

router.use('/auth', AuthRouter);
router.use('/app', AppRouter);
router.use('/product', ProductRouter);
router.use('/ws', WebSocketsRouter);

module.exports = router;