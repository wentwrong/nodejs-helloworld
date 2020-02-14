const App = require('./server/app');
// const MockGithubApp = require('../test/mock-github-app');

if (require.main === module) {
    const app = new App();

    app.run();
    //const app = new MockGithubApp();
    //app.run();
}

module.exports = App;
