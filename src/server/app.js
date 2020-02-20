const config = require('./config');
const ConfigExpress = require('./configExpress');
const express = require('express');

class App extends ConfigExpress {
    constructor (...props) {
        super(...props);
        this._setMiddlewares();
    }

    _setMiddlewares () {
        this.express.use(express.static(config.STATIC_DIR));
        this.express.use(express.static(config.CLIENT_SCRIPTS_DIR));
    }
}

module.exports = App;
