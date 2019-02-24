import { Controller, Get, Req, Res } from '@tsed/common';
import * as Express from 'express';
import * as _ from 'underscore';
import { Country } from '../../models/country.model';
import { Currency } from '../../models/currency.model';
import { Language } from '../../models/language.model';
import { ConfigService } from '../../services/config.service';

@Controller('/app')
export class AppController {
    constructor(private configService: ConfigService) {}

    @Get('/config')
    public async getConfig() {
        return {
            'home.filters': this.configService.get('home.filters', 0),
            'product.showSharedCount': this.configService.get('product.showSharedCount', 0),
            'product.allowQRCode': this.configService.get('product.allowQRCode', 1),
            'product.allowShared': this.configService.get('product.allowShared', 1),
            'product.allowSku': this.configService.get('product.allowSku', 1),
            'product.maxInCompare': this.configService.get('product.maxInCompare', 20),
            'product.maxInFavorite': this.configService.get('product.maxInFavorite', 50),
        };
    }

    @Get('/currencies')
    public async getCurrencies(@Res() res: Express.Response) {
        return await Currency.findAll().then((data: Currency[]) => {
            res.json(_.map(data, ((item: Currency) => item.resource())));
        });
    }

    @Get('/languages')
    public async getLanguages(@Res() res: Express.Response) {
        return await Language.findAll().then((data: Language[]) => {
            res.json(_.map(data, ((item: Language) => item.resource())));
        });
    }

    @Get('/countries')
    public async getCountries(@Res() res: Express.Response) {
        return await Country.findAll({
            order: [['title', 'ASC']],
        }).then((data: Country[]) => {
            res.json(_.map(data, ((item: Country) => item.resource())));
        });
    }
}
