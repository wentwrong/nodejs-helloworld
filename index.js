const App = require('./src/server/app');
const globalErrorHandlers = require('./src/server/globerrorhandlers');

globalErrorHandlers();

if (require.main === module) {
    const app = new App();

    app.run();
}

module.exports = App;
