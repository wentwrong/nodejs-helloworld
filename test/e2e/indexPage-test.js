import App from '../../';
import { DEFAULT_CONFIG } from '../../lib/server/config';
import MockGithubApp from '../../lib/mock-github/mockGithubApp';
import pullRequestsModel from '../../lib/mock-github/models/pullRequestsModel';
import sharedConfig from '../../lib/shared/sharedConfig';
import page from './pages/indexPage';

const pullRequest = require('../fixtures/pullRequest');

const mockGithub = new MockGithubApp({ port: 1338, routesDir: DEFAULT_CONFIG.mockRoutesDir });
const mockGithubUrl = `http://${mockGithub.config.host}:${mockGithub.config.port}/${DEFAULT_CONFIG.mockPrefix}`;

const app = new App({
    port:         1337,
    githubAPIURL: mockGithubUrl,
    slugs:        ['wentwrong/gh-canary']
});

const appUrl = `http://${app.config.host}:${app.config.port}`;

fixture `Main page`
    .page(appUrl)
    .before(async () => {
        await app.run();
        await mockGithub.run();
    })
    .after(async () => {
        await app.close();
        await mockGithub.close();
    })
    .beforeEach(async () => {
        pullRequestsModel.clear();
    });

test(`Pull Requests dynamically updated with time (${sharedConfig.POLLING_INTERVAL} ms interval)`, async t => {
    await t
        .expect(page.noPullRequestsDiv.exists)
        .ok();

    pullRequestsModel.addPullRequest(pullRequest);

    await t
        .expect(page.pullRequestDiv.exists)
        .ok('', { timeout: sharedConfig.POLLING_INTERVAL + 3000 });
});

test(`Pull Requests updated via click on reload button`, async t => {
    await t
        .expect(page.noPullRequestsDiv.exists)
        .ok();

    pullRequestsModel.addPullRequest(pullRequest);

    await page.clickReloadBtn();

    await t
        .expect(page.pullRequestDiv.exists)
        .ok();
});
