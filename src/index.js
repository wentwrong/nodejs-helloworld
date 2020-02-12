const App = require('./server/app');

if (require.main === module) {
    const app = new App();

    app.run();
}

module.exports = App;
