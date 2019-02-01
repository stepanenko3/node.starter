const express = require('express');
const router = express.Router();

const appController = require('../../controller/v1/app');

router.get('/config', appController.getConfig);
router.get('/currencies', appController.getCurrencies);
router.get('/langs', appController.getLanguages);

module.exports = router;