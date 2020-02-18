const ConfigExpress = require('../src/server/configexpress');

class MockGithubApp extends ConfigExpress {
    constructor (...props) {
        super(...props);
    }
}

module.exports = MockGithubApp;
