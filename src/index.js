const express = require('express');
const Server = require('./my-server');

const app = express();

app.use(express.static('static'));

if (require.main === module) {
    const app = new App({ port: 3002 });

    server.start();
}

module.exports = {
    server: new Server(app)
};
