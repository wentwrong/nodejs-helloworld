import { once } from 'events';
import debug from './debug';

export default class Server {
    constructor (app, port, host) {
        this.app = app;
        this.port = port;
        this.host = host;
    }

    _listenPromisify () {
        const netServer = this.app.listen(this.port);

        return once(netServer, 'listening').then(() => netServer);
    }

    _closePromisify () {
        if (this.server) {
            const netServer = this.server.close();

            return once(netServer, 'close');
        }

        return Promise.reject(new Error('Server instance not found'));

    }

    async start () {
        try {
            this.server = await this._listenPromisify();

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

    async stop () {
        try {
            await this._closePromisify();

            debug.log(`Server '${this.host}:${this.port}' stopped working`);
        }
        catch (err) {
            debug.error('Server failed to stop');

            throw err;
        }
    }
}
