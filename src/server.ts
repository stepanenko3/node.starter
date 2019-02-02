import {
    GlobalAcceptMimesMiddleware,
    ServerLoader,
    ServerSettings,
} from '@tsed/common';
import * as dotenv from 'dotenv';
import Path = require('path');
import { Sequelize } from 'sequelize-typescript';
import ConfigMiddleware from './middlewares/config.middleware';
import { ConfigService } from './services/config.service';

const rootDir = Path.resolve(__dirname);
dotenv.config();

@ServerSettings({
    rootDir,
    mount: {
        '/api': `${rootDir}/controllers/current/**/*.ts`,
        '/api/v1': `${rootDir}/controllers/v1/**/*.ts`,
    },
    componentsScan: [
        `${rootDir}/services/**/**.ts`,
        `${rootDir}/middlewares/**/**.ts`,
    ],
    acceptMimes: ['application/json'],
})
export class Server extends ServerLoader {
    private env = process.env;

    public $onInit(): void {
        const sequelize = new Sequelize({
            port: +this.env.DB_PORT,
            database: this.env.DB_NAME,
            dialect: this.env.DB_DIALECT,
            username: this.env.DB_USERNAME,
            password: this.env.DB_PASSWORD,
            host: this.env.DB_HOST,
            storage: ':memory:',
            modelPaths: [`${rootDir}/models/**/*.ts`],
            modelMatch: (filename, member) => {
                return (
                    filename.substring(0, filename.indexOf('.model')) ===
                    member.toLowerCase()
                );
            },
        });

        sequelize
            .authenticate()
            .then(() => console.log('Connection has been established successfully.'))
            .catch((err) => console.error('Unable to connect to the database:', err));
    }

    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void | Promise<any> {
        const cookieParserModule = require('cookie-parser');
        const bodyParserModule = require('body-parser');
        const compressModule = require('compression');
        const methodOverrideModule = require('method-override');

        this.use(GlobalAcceptMimesMiddleware)
            .use(cookieParserModule())
            .use(compressModule({}))
            .use(methodOverrideModule())
            .use(bodyParserModule.json())
            .use(bodyParserModule.urlencoded({ extended: true }))
            .use(ConfigMiddleware);

        return null;
    }

    public $onReady() {
        console.log('Server started...');
    }

    public $onServerInitError(err: any) {
        console.error(err);
    }
}

new Server().start();
