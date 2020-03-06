import express from 'express';
import logger from './middleware/logger';
import Server from './server';
import createRoutes from './utils/routes/createRoutes';
import createConfig, { Config } from './config';

/**
 * Wrapper for express application. Deal with initial preconfiguration
 *
 * @export
 * @class ConfiguratedExpress
 */
export default class ConfiguratedExpress {
    readonly config: Config;

    public express: express.Application;
    private server?: Server;

    constructor (config?: Partial<Config>) {
        this.config = createConfig(config);
        this.express = express();
    }

    /**
     * Initiate our express configuration:
     * create routes, set middlewares and settings.
     *
     * @returns {Promise<void>}
     * @memberof ConfiguratedExpress
     */
    private async init (): Promise<void> {
        this.express.use(logger);

        this.express.use(express.json());

        this.express.use(express.urlencoded({ extended: true }));

        this.express.set(this.config.jsonExpressSettingName, this.config.jsonExpressSettingSpaces);

        this.express.use(await createRoutes(this.config));
    }

    /**
     * Init application and starts it
     *
     * @returns {Promise<void>}
     * @memberof ConfiguratedExpress
     */
    async run (): Promise<void> {
        await this.init();
        this.server = new Server(this.express, this.config.port, this.config.host);
        await this.server.start();
    }

    /**
     * Close app or throw error
     *
     * @returns {Promise<void>}
     * @memberof ConfiguratedExpress
     */
    async close (): Promise<void> {
        if (this.server)
            await this.server.stop();
        else
            throw new Error('Stop when application not running');
    }
}
