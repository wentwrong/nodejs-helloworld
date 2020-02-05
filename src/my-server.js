const util = require('util');

class Server {
    constructor(app, host = '127.0.0.1', port = 3000) {
        this.app = app;
        this.port = port;
        this.host = host;
    }

    start() {
        return new Promise((resolve, reject) => { 
            this.server = this.app.listen(this.port, resolve).on('error', reject)
        });
    }

    stop() {
        return new Promise((resolve, reject) => { 
            this.server = this.server.close(resolve).on('error', reject)
        });
    }
}

module.exports = Server;