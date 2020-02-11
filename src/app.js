const express = require('express');
const Server = require('./my-server');
const { DEFAULT_PORT, DEFAULT_HOST } = require('./config');
const router = require('./router');

class App {
    constructor ({ port = DEFAULT_PORT, host = DEFAULT_HOST } = {}) {
        this.server = new Server(this._configExpress(express()), port, host);
    }

    _configExpress (e) {
        e.set('view engine', 'pug');
        e.use(router);
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
