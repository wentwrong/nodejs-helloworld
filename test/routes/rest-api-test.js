import { expect } from 'chai';
import got from 'got';
import config from '../../lib/server/config';
import pullsFixture from '../fixtures/pulls';
import App from '../../';
import MockGithubApp from '../mockGithubApp';

describe(`REST API`, () => {
    const mockGithub = new MockGithubApp({
        port:      1337,
        routesDir: config.MOCK_ROUTES_DIR
    });

    const app = new App({ port: 1338 });

    before(async () => {
        const mockGithubUrl = `http://${mockGithub.host}:${mockGithub.port}/${config.MOCK_GITHUB_PREFIX}`;

        app.set(config.GITHUB_API_VAR_NAME, mockGithubUrl);

        await app.run();
        await mockGithub.run();
    });

    after(async () => {
        await app.close();
        await mockGithub.close();
    });

    it(`GET /api/${config.API_VERSION}/pulls/list should return correct pull requests`, async () => {

        const url = `http://${app.server.host}:${app.server.port}/api/${config.API_VERSION}/pulls/list`;
        const response = await got(url, { responseType: 'json' });

        expect(response.statusCode).equal(200);
        expect(response.body.pullRequestList).to.eql(pullsFixture);
    });
});
