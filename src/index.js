const App = require('./server/app');
const globalErrorHandlers = require('./server/globerrorhandlers');

globalErrorHandlers();

if (require.main === module) {
    const app = new App();

    app.run();
}

module.exports = App;
