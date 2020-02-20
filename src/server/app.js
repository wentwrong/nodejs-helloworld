import express from 'express';
import config from './config';
import ConfiguratedExpress from './configuratedExpress';

export default class App extends ConfiguratedExpress {
    constructor (...props) {
        super(...props);
        this._setMiddlewares();
    }

    _setMiddlewares () {
        this.express.use(express.static(config.STATIC_DIR));
        this.express.use(express.static(config.CLIENT_SCRIPTS_DIR));
    }
}
