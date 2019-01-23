const express = require('express');
const router = express.Router();
const Product = require('./product');

router.use('/product', Product);

module.exports = router;