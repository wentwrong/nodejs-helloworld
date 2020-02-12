require('./config');

const express = require('express');
const Server = require('./my-server');
const router = require('./routes/router');

class App {
    constructor ({ port = process.env.PORT, host = process.env.HOST } = {}) {
        this.server = new Server(this._configExpress(express()), port, host);
    }

    _configExpress (e) {
        e.use(express.static('src/client/public'));
        e.use(router);

        // NOTE: custom middleware after all
        e.use((err, req, res, next) => {
            res.status(err.status).json(err);
            next();
        });

        return e;
    }

    async run () {
        await this.server.start();
    }

    async close () {
        await this.server.stop();
    }
}

module.exports = App;
