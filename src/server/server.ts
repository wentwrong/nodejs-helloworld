import { Server as NetServer } from 'net';
import { once } from 'events';
import express from 'express';
import debugFactory from './debug';

const debug = debugFactory('server');

export default class Server {
    private server?: NetServer;

    constructor (
        public app: express.Application,
        public port: number | string,
        public host: string
    ) { }

    private listenPromisify (): Promise<NetServer> {
        const netServer = this.app.listen(this.port);

        return once(netServer, 'listening').then(() => netServer);
    }

    private closePromisify (): Promise<void[]> {
        if (this.server) {
            const netServer = this.server.close();

            return once(netServer, 'close');
        }

        return Promise.reject(new Error('Server instance not found'));
    }

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
