const config = require('../../src/server/config');
const mockPulls = require('../fixtures/pulls');
const { expect } = require('chai');
const got = require('got');
const App = require('../../src/index');
const MockGithubApp = require('../mock-github-app');

describe(`REST API`, () => {
    const mockGithubApp = new MockGithubApp({ port: 1338 });
    const app = new App({
        port:          1337,
        mockGithubUrl: `http://${mockGithubApp.host}:${mockGithubApp.port}/${config.MOCK_GITHUB_PREFIX}`
    });

    before(async () => {
        await app.run();
        await mockGithubApp.run();
    });

    after(async () => {
        await app.close();
        await mockGithubApp.close();
    });

    it(`GET /api/${config.API_VERSION}/pulls/list should return correct pull requests`, async () => {

        const url = `http://${app.server.host}:${app.server.port}/api/${config.API_VERSION}/pulls/list`;
        const response = await got(url, { responseType: 'json' });

        expect(response.statusCode).equal(200);
        expect(response.body.pullRequestList).to.eql(mockPulls);
    });
});
