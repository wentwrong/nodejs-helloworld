const config = require('./config');
const express = require('express');
const Server = require('./my-server');
const createRoutes = require('./routes');
const morgan = require('morgan');

class App {
    constructor ({ port = config.PORT, host = config.HOST } = {}) {
        this.port = port;
        this.host = host;
    }

    async _configExpress (e) {
        const routes = await createRoutes(config.ROUTES_DIR);

        e.use(routes);

        if (config.NODE_ENV === 'development')
            e.use(morgan('dev'));


        e.use(express.static(config.STATIC_DIR));

        return e;
    }

    async run () {
        const configuredExpress = await this._configExpress(express());

        this.server = new Server(configuredExpress, this.port, this.host);
        await this.server.start();
    }

    async close () {
        if (this.server)
            await this.server.stop();
        else
            throw new Error('Stop when application not running');
    }
}

module.exports = App;
