const path = require('path');
const express = require('express');
const Server = require('./my-server');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

module.exports = {
    server: new Server(app)
};
