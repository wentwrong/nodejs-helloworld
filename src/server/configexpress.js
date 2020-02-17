const config = require('./config');
const logger = require('./middleware/logger');
const Server = require('./server');
const express = require('express');
const createRoutes = require('./createRoutes');

// TODO:
// inherit from express app when we move to Typescript
class ConfigExpress {
    constructor ({ port = config.PORT, host = config.HOST, routesDir = config.ROUTES_DIR } = {}) {
        this.express = express();
        this.port = port;
        this.host = host;
        this.server = null;
        this.routesDir = routesDir;

        this._setMiddlewares();
        this._setVariables();
        this._setRouters();
    }

    set (key, value) {
        this.express.set(key, value);
    }

    _setMiddlewares () {
        this.express.use(logger);
    }

    _setVariables () {
        this.express.set('json spaces', 2);
    }

    async _setRouters () {
        this.express.use(await createRoutes(this.routesDir));
    }

    async run () {
        this.server = new Server(this.express, this.port, this.host);
        await this.server.start();
    }

    async close () {
        if (this.server)
            await this.server.stop();
        else
            throw new Error('Stop when application not running');
    }
}

module.exports = ConfigExpress;
