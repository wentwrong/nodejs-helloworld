const App = require('./app');

if (require.main === module) {
    const app = new App({ port: 3002 });

    app.run();
}
