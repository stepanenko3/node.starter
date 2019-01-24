const express = require('express');
const router = express.Router();
const ProductRouter = require('./product');
const WebSocketsRouter = require('./ws');

const appController = require('../controller/app');

router.use('/product', ProductRouter);
router.use('/ws', WebSocketsRouter);
router.get('/config', appController.getConfig);
router.get('/currencies', appController.getCurrencies);
router.get('/langs', appController.getLanguages);

module.exports = router;