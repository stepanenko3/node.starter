import * as express from 'express';
import * as controller from '../controller';

export class MainRoutes {
    public router: express.Router = express.Router();

    constructor() {
        this.init();
    }

    private init(): void {
        this.router.get('/api/v1/app/config', controller.appController.getConfig);
        this.router.get('/api/v1/app/currencies', controller.appController.getCurrencies);
        this.router.get('/api/v1/app/langs', controller.appController.getLanguages);
        this.router.get('/api/v1/app/countries', controller.appController.getCountries);
        this.router.get('/api/v1/app/cities', controller.appController.getCities);
    }
}
