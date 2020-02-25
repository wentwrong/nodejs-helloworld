import express from 'express';
import config from './config';
import ConfiguratedExpress from './configuratedExpress';
import { AppConfigurationAsParam } from './utils/app/appConfiguration';


/**
 * Main Application class.
 *
 * @export
 * @class App
 * @extends {ConfiguratedExpress}
 */
export default class App extends ConfiguratedExpress {
    constructor (conf?: AppConfigurationAsParam) {
        super(conf);
        this.setMiddlewares();
    }

    /**
     * Set additional middlewares for app
     *
     * @private
     * @memberof App
     */
    private setMiddlewares (): void {
        this.express.use(express.static(config.STATIC_DIR));
        this.express.use(express.static(config.CLIENT_SCRIPTS_DIR));
    }
}
