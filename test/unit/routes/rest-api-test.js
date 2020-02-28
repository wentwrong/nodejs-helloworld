import { expect } from 'chai';
import got from 'got';
import config from '../../../lib/server/config';
import App from '../../../';
import MockGithubApp from '../../../lib/mock-github/mockGithubApp';
import PullRequestsModel from '../../../lib/server/models/pullRequestsModel';

const pullRequest = require('../../fixtures/pullRequest');

describe(`REST API`, () => {
    const mockGithub = new MockGithubApp({ port: 1338, routesDir: config.MOCK_ROUTES_DIR });
    const app = new App({ port: 1339 });

    before(async () => {
        const mockGithubUrl = `http://${mockGithub.config.host}:${mockGithub.config.port}/${config.MOCK_GITHUB_PREFIX}`;

        app.set(config.GITHUB_API_VAR_NAME, mockGithubUrl);

        await app.run();
        await mockGithub.run();
    });

    after(async () => {
        await app.close();
        await mockGithub.close();
    });

    it(`GET /api/${config.API_VERSION}/pulls/list should return correct pull requests`, async () => {
        const url = `http://${app.config.host}:${app.config.port}/api/${config.API_VERSION}/pulls/list`;

        PullRequestsModel
            .getModel()
            .addPullRequest(pullRequest);

        const response = await got(url, { responseType: 'json' });

        expect(response.statusCode).equal(200);
        expect(response.body.pullRequestList).to.eql([pullRequest]);
    });
});
