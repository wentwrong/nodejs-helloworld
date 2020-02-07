const express = require('express');

const Server = require('./my-server');
const { DEFAULT_HOST, DEFAULT_PORT } = require('./constants');

class App {
    constructor ({ port = DEFAULT_PORT, host = DEFAULT_HOST } = {}) {
        this.express = express();
        this.express.use(express.static('static'));
        this.server = new Server(this.express, port, host);
    }

    run () {
        this.server.start();
    }

    close () {
        this.server.stop();
    }
}

module.exports = App;
