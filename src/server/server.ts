import { Server as NetServer } from 'net';
import { once } from 'events';
import express from 'express';
import debugFactory from './debug';

const debug = debugFactory('server');

/**
 * Wrapper for encapsulating express server old-style 'async based on events subscription' functions
 *
 * @export
 * @class Server
 */
export default class Server {
    private server?: NetServer;

    constructor (
        public app: express.Application,
        public port: number | string,
        public host: string
    ) { }

    /**
     * Async-wrapper for converting old-style 'async based on events subscription' to Promises
     *
     * Starts express server
     *
     * @private
     * @returns {Promise<NetServer>}
     * @memberof Server
     */
    private listenPromisify (): Promise<NetServer> {
        const netServer = this.app.listen(this.port);

        return once(netServer, 'listening').then(() => netServer);
    }

    /**
     * Async-wrapper for converting old-style 'async based on events subscription' to Promises
     *
     * Close server if exists
     *
     * @private
     * @returns {Promise<void[]>}
     * @memberof Server
     */
    private closePromisify (): Promise<void[]> {
        if (this.server) {
            const netServer = this.server.close();

            return once(netServer, 'close');
        }

        return Promise.reject(new Error('Server instance not found'));
    }


    /**
     * Start server
     *
     * @returns {Promise<void>}
     * @memberof Server
     */
    async start (): Promise<void> {
        try {
            this.server = await this.listenPromisify();

            debug.log(`Server '${this.host}:${this.port}' started`);
        }
        catch (err) {
            switch (err.code) {
                case 'EACCES':
                    debug.error(`Server requires elevated privileges`);
                    break;
                case 'EADDRINUSE':
                    debug.error(`Server is already in use`);
                    break;
            }
            debug.error(err);
            throw err;
        }
    }

    /**
     * Stop server
     *
     * @returns {Promise<void>}
     * @memberof Server
     */
    async stop (): Promise<void> {
        try {
            await this.closePromisify();

            debug.log(`Server '${this.host}:${this.port}' stopped working`);
        }
        catch (err) {
            debug.error('Server failed to stop');

            throw err;
        }
    }
}
