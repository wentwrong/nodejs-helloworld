const express = require('express');
const Server = require('./my-server');
const { DEFAULT_PORT, DEFAULT_HOST } = require('./config');

class App {
    constructor ({ port = DEFAULT_PORT, host = DEFAULT_HOST } = {}) {
        this.express = express();
        this.express.use(express.static('static'));

        this.server = new Server(this.express, port, host);
    }

    async run () {
        await this.server.start();
    }

    async close () {
        await this.server.stop();
    }
}

module.exports = App;
