import * as _ from 'underscore';
import { Currency } from '../../models/currency.model';

export default class CurrencyResource {
    public transform(currency: any) {
        const columns = ['id', 'name', 'code', 'symbol', 'rate', 'locale', 'default'];
        const resource: any = {};

        columns.map((column: any) => {
            if (column in currency) {
                resource[column] = currency[column];
            }
        });

        return resource;
    }
}
