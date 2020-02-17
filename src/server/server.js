const { once } = require('events');
const { log, error } = require('./debug');

class Server {
    constructor (app, port, host) {
        this.app = app;
        this.port = port;
        this.host =  host;
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

            log(`Server '${this.host}:${this.port}' started`);
        }
        catch (err) {
            switch (err.code) {
                case 'EACCES':
                    error(`Server requires elevated privileges`);
                    break;
                case 'EADDRINUSE':
                    error(`Server is already in use`);
                    break;
            }
            log(err);
            throw err;
        }
    }

    async stop () {
        try {
            await this._closePromisify();

            log(`Server '${this.host}:${this.port}' stopped working`);
        }
        catch (err) {
            error('Server failed to stop');

            throw err;
        }
    }
}

module.exports = Server;
