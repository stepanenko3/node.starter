import { Request, Response } from 'express';

export class AppController {
    public getConfig(req: Request, res: Response) {
        res.json({
            // 'home.filters': config.getDefault('home.filters', 0),
            // 'product.showSharedCount': config.getDefault('product.showSharedCount', 0),
            // 'product.allowQRCode': config.getDefault('product.allowQRCode', 1),
            // 'product.allowShared': config.getDefault('product.allowShared', 1),
            // 'product.allowSku': config.getDefault('product.allowSku', 1),
            // 'product.maxInCompare': config.getDefault('product.maxInCompare', 20),
            // 'product.maxInFavorite': config.getDefault('product.maxInFavorite', 50),
        });
    }
}

export const appController = new AppController();
