import * as express from 'express';
import { appController } from '../../controller';

export const register = (app: express.Application) => {
    app.get('/config', appController.getConfig);
    app.get('/currencies', appController.getCurrencies);
    app.get('/langs', appController.getLanguages);
    app.get('/countries', appController.getCountries);
    app.get('/cities', appController.getCities);
};
