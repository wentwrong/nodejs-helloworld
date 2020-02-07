const debug = require('debug');
const { once } = require('events');

const log = debug('http:log');
const error = debug('http:error');

class Server {
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
            log(`Server started on ${this.host}:${this.port}`);
        }
        catch (err) {
            error(`Server failed to start`);
            error(err);
        }
    }

    async stop () {
        try {
            await this._closePromisify();
            log(`Server stoped`);
        }
        catch (err) {
            error('Server failed to stop');
            error(err);
        }
    }
}

module.exports = Server;
