const config = require('./config');
const debug = require('./debug');
const express = require('express');
const Server = require('./server');
const createRoutes = require('./createRoutes');
const morgan = require('morgan');

class App {
    constructor ({ port = config.PORT, host = config.HOST, mockGithubUrl = '' } = {}) {
        this.port = port;
        this.host = host;
        this.mockGithubUrl = mockGithubUrl;
    }

    async _configExpress (e) {
        e.use(morgan('combined', { stream: { write: msg => debug.morgan(msg) } }));
        e.use(express.static(config.STATIC_DIR));
        e.set('mock-github', this.mockGithubUrl);
        e.set('json spaces', 2);

        const routes = await createRoutes(config.ROUTES_DIR);

        e.use(routes);

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
