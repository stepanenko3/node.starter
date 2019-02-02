import { Controller, Get } from '@tsed/common';
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
}
