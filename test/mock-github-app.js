const App = require('../src/server/app');
const createRoutes = require('../src/server/createRoutes');
const config = require('../src/server/config');

class MockGithubApp extends App {
    constructor (...props) {
        super(...props);
    }

    async _configExpress (e) {
        const mockGithubRoutes = await createRoutes(config.MOCK_ROUTES_DIR);

        e.use(mockGithubRoutes);
        e.set('json spaces', 2);

        return e;
    }
}

module.exports = MockGithubApp;
