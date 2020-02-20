const ConfigExpress = require('../lib/server/configExpress');

class MockGithubApp extends ConfigExpress {
    constructor (...props) {
        super(...props);
    }
}

module.exports = MockGithubApp;
