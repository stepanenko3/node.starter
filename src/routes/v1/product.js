const express = require('express');
const router = express.Router();

const controller = require('../../controller/v1/product');

router.get('/', controller.getAll);

module.exports = router;