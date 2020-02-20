const App = require('./server/app');
const globalErrorHandlers = require('./server/globerrorhandlers');

globalErrorHandlers();

if (require.main === module) {
    console.log(__dirname);

    const app = new App();

    app.run();
}

module.exports = App;
