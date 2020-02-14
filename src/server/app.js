const config = require('./config');
const express = require('express');
const Server = require('./server');
const createRoutes = require('./createRoutes');
const logger = require('./middleware/logger');

class App {
    constructor ({ port = config.PORT, host = config.HOST, mockGithubUrl = '' } = {}) {
        this.port = port;
        this.host = host;
        this.mockGithubUrl = mockGithubUrl;
    }

    async _configExpress (e) {
        e.use(logger);
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
