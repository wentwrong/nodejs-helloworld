import express from 'express';
import config from './config';
import logger from './middleware/logger';
import Server from './server';
import createRoutes from './createRoutes';

// TODO:
// inherit from express app when we move to Typescript
export default class ConfiguratedExpress {
    constructor ({ port = config.PORT, host = config.HOST, routesDir = config.ROUTES_DIR } = {}) {
        this.express = express();
        this.port = port;
        this.host = host;
        this.server = null;
        this.routesDir = routesDir;
        this.jsonSpaceSetting = 'json spaces';
    }

    async init () {
        this.express.use(logger);

        this.express.set(this.jsonSpaceSetting, config.JSON_SPACES);

        this.express.use(await createRoutes(this.routesDir));
    }

    async run () {
        await this.init();
        this.server = new Server(this.express, this.port, this.host);
        await this.server.start();
    }

    async close () {
        if (this.server)
            await this.server.stop();
        else
            throw new Error('Stop when application not running');
    }

    set (key, value) {
        this.express.set(key, value);
    }
}
