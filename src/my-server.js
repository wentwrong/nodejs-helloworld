const { DEFAULT_HOST, DEFAULT_PORT } = require('./constants');

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
            .then(() => console.log(`Server started on ${this.host}:${this.port}`))
            .catch(() => console.log(`Server failed to start`));
    }

    stop () {
        return new Promise((resolve, reject) => {
            this.server = this.server.close(resolve).on('error', reject);
        })
            .then(() => console.log(`Server stop listening for connections`))
            .catch(() => console.log(`Failed to close server`));
    }
}

module.exports = Server;
