import express from 'express';
import config from './config';
import logger from './middleware/logger';
import Server from './server';
import createRoutes from './utils/routes/createRoutes';
import { AppConfigurationAsParam, AppConfiguration } from './utils/app/appConfiguration';

export default class ConfiguratedExpress {
    public express: express.Application;
    public config: AppConfiguration;
    private server?: Server;

    constructor ({ port = config.PORT, host = config.HOST, routesDir = config.ROUTES_DIR }:
        AppConfigurationAsParam = {}) {
        this.express = express();
        this.config = { port, host, routesDir };
    }

    async init (): Promise<void> {
        this.express.use(logger);

        this.express.set(config.JSON_SETTING_NAME, config.JSON_SPACES);

        this.express.use(await createRoutes(this.config.routesDir));
    }

    async run (): Promise<void> {
        await this.init();
        this.server = new Server(this.express, this.config.port, this.config.host);
        await this.server.start();
    }

    async close (): Promise<void> {
        if (this.server)
            await this.server.stop();
        else
            throw new Error('Stop when application not running');
    }

    set (key: string, value: string): void {
        this.express.set(key, value);
    }
}
