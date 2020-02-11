const App = require('./app');
const router = require('./router');
const express = require('express');

if (require.main === module) {
    const expressApp = express();

    expressApp.set('view engine', 'pug');
    expressApp.use(router);
    const app = new App({ e: expressApp });

    app.run();
}

module.exports = App;
