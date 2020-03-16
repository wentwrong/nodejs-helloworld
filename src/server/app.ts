import express from 'express';
import ConfiguratedExpress from './configuratedExpress';
import { Config } from './config';

/**
 * Main Application class.
 *
 * @export
 * @class App
 * @extends {ConfiguratedExpress}
 */


export default class App extends ConfiguratedExpress {
    constructor (conf?: Partial<Config>) {
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
        this.express.use(express.static(this.config.staticDir));
        this.express.use(express.static(this.config.clientScriptsDir));
    }
}
