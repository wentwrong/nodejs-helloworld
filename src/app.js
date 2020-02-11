const express = require('express');
const Server = require('./my-server');
const { DEFAULT_PORT, DEFAULT_HOST } = require('./config');

class App {
    constructor ({ port = DEFAULT_PORT, host = DEFAULT_HOST, e = express() } = {}) {
        this.server = new Server(this._defaultConfig(e), port, host);
    }

    _defaultConfig (e) {
        e.get('/', (req, res) => res.send('Hello Node.js'));
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
