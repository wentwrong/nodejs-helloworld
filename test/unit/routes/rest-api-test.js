import { expect } from 'chai';
import axios from 'axios';
import App from '../../../';
import MockGithubApp from '../../../lib/mock-github/mockGithubApp';
import pullRequestsModel from '../../../lib/mock-github/models/pullRequestsModel';
import { DEFAULT_CONFIG } from '../../../src/server/config';

describe(`REST API`, () => {
    const mockGithub = new MockGithubApp({ port: 1338, routesDir: DEFAULT_CONFIG.mockRoutesDir });
    const mockGithubUrl = `http://${mockGithub.config.host}:${mockGithub.config.port}/${DEFAULT_CONFIG.mockPrefix}`;

    const app = new App({
        port:         1339,
        githubAPIURL: mockGithubUrl,
        slugs:        ['wentwrong/gh-canary']
    });

    beforeEach(() => pullRequestsModel.clear());

    before(async () => {
        await app.run();
        await mockGithub.run();
    });

    after(async () => {
        await app.close();
        await mockGithub.close();
    });

    it(`GET /api/${DEFAULT_CONFIG.apiVersion}/pulls/list should return correct pull requests`, async () => {
        const url = `http://${app.config.host}:${app.config.port}/api/${DEFAULT_CONFIG.apiVersion}/pulls/list`;

        pullRequestsModel.generateMockPullRequests(1);

        const pulls = pullRequestsModel.getPullRequests();
        const response = await axios.get(url, { responseType: 'json' });

        expect(response.status).equal(200);
        expect(response.data.pullRequestList).to.eql(pulls);
    });
});
