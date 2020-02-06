const debug = require('debug');

const { DEFAULT_HOST, DEFAULT_PORT } = require('./constants');

const log = debug('http:log');
const error = debug('http:error');

class Server {
    constructor (app, host = DEFAULT_HOST, port = DEFAULT_PORT) {
        this.app = app;
        this.port = port;
        this.host = host;
    }

    start () {
        return new Promise((resolve, reject) => {
            this.server = this.app.listen(this.port, resolve).on('error', reject);
        })
            .then(() => log('Server started on %s:%d', this.host, this.port))
            .catch(() => error('Server failed to start'));
    }

    stop () {
        return new Promise((resolve, reject) => {
            this.server = this.server.close(resolve).on('error', reject);
        })
            .then(() => log('Server stop listening for connections'))
            .catch(() => error('Failed to close server'));
    }
}

module.exports = Server;
