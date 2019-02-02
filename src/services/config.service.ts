import { ServerSettingsService } from '@tsed/common';
import { Service } from '@tsed/di';

import * as _ from 'underscore';

@Service()
export class ConfigService {
    private settings = {};
    private config: any = {};

    constructor(private serverSettings: ServerSettingsService) {
        this.settings = this.serverSettings.get('customServiceOptions');
    }

    public getSettings() {
        return this.settings;
    }

    public getAll() {
        return this.config;
    }

    public get(key: string, def: any = null): any {
        if (_.has(this.config, key)) {
            return this.config[key];
        } else if (def) {
            return def;
        } else {
            return null;
        }
    }

    public set(key: string, value: any): void {
        this.config[key] = value;
    }

    public load(config: object) {
        this.config = _.extend(this.config, config);
    }
}
