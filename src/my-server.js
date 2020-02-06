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
            this.server = this.app.listen(this.port, resolve)
                .once('error', err => {
                    error(err);
                    reject(err);
                });
        })
            .then(() => log(`Server started on ${this.host}:${this.port}`))
            .catch(err => {
                error(`Server failed to start`);
                return Promise.reject(err);
            });
    }

    stop () {
        return new Promise((resolve, reject) => {
            this.server = this.server.close(resolve)
                .once('error', err => {
                    error(err);
                    reject(err);
                });
        })
            .then(() => log(`Server stop listening for connections`))
            .catch(err => {
                error(`Failed to close server`);
                return Promise.reject(err);
            });
    }
}

module.exports = Server;
