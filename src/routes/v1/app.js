const express = require('express');
const router = express.Router();

const appController = require('../../controller/v1/app');

router.get('/config', appController.getConfig);
router.get('/currencies', appController.getCurrencies);
router.get('/langs', appController.getLanguages);
router.get('/countries', appController.getCountries);
router.get('/cities', appController.getCities);

module.exports = router;