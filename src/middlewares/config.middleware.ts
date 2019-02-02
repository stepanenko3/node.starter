import { IMiddleware, Middleware, Request } from '@tsed/common';
import * as _ from 'underscore';
import { Configuration } from '../models/configuration.model';
import { ConfigService } from '../services/config.service';

@Middleware()
export default class ConfigMiddleware implements IMiddleware {
    constructor(private configService: ConfigService) {}

    public async use(@Request() request: any) {
        await Configuration.findAll().then((config: any) => {
            _.map(config, (value: any) => this.configService.set(value.key, value.value));
        });

    }
}
