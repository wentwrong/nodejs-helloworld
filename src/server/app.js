const config = require('./config');
const ConfigExpress = require('./configexpress');
const express = require('express');

class App extends ConfigExpress {
    constructor (...props) {
        super(...props);
        this._setMiddlewares();
    }

    _setMiddlewares () {
        this.express.use(express.static(config.STATIC_DIR));
    }
}

module.exports = App;
