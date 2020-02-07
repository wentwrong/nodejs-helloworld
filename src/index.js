const express = require('express');
const Server = require('./my-server');

const app = express();

app.use(express.static('static'));

if (require.main === module) {
    const server = new Server(app);

    server.start();
}

module.exports = {
    server: new Server(app)
};
