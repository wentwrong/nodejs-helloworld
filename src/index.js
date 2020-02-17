const App = require('./server/app');
const globalErrorHandlers = require('./server/globerrorhandlers');

if (require.main === module) {
    globalErrorHandlers();

    const app = new App();

    app.run();
}

module.exports = App;
