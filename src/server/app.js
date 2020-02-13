const config = require('./config');
const express = require('express');
const Server = require('./my-server');
const createRoutes = require('./routes');

class App {
    constructor ({ port = config.PORT, host = config.HOST } = {}) {
        this.port = port;
        this.host = host;
    }

    async _configExpress (e) {
        const routes = await createRoutes(config.ROUTES_DIR);

        e.use(routes);
        e.use(express.static(config.STATIC_DIR));

        // NOTE: custom middleware error handler
        e.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                error: {
                    message: err.message
                }
            });
            next();
        });

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
