const express = require('express');
const Server = require('./my-server');

const app = express();

app.use(express.static('static'));

if (require.main === module)
    (async () => await new Server(app).start())();


module.exports = {
    server: new Server(app)
};
