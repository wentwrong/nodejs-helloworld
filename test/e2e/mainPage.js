import { Selector } from 'testcafe';
import App from '../../';
import config from '../../lib/server/config';
import MockGithubApp from '../../lib/mock-github/mockGithubApp';
import PullRequestsModel from '../../lib/server/models/pullRequestsModel';
import sharedConfig from '../../lib/shared/sharedConfig';

const pullRequest = require('../fixtures/pullRequest');

const app = new App({ port: 1337 });
const mockGithub = new MockGithubApp({ port: 1338, routesDir: config.MOCK_ROUTES_DIR });

const appUrl = `http://${app.config.host}:${app.config.port}`;
const mockGithubUrl = `http://${mockGithub.config.host}:${mockGithub.config.port}/${config.MOCK_GITHUB_PREFIX}`;

fixture `Main page`
    .page(appUrl)
    .before(async () => {
        app.set(config.GITHUB_API_VAR_NAME, mockGithubUrl);

        await app.run();
        await mockGithub.run();
    })
    .after(async () => {
        await app.close();
        await mockGithub.close();
    });

test(`Pull Requests dynamically updated with time (${sharedConfig.POLLING_INTERVAL} ms interval)`, async t => {
    await t
        .expect(Selector('#no-pull-requests').exists)
        .ok();

    PullRequestsModel
        .getModel()
        .addPullRequest(pullRequest);

    await t
        .expect(Selector('#pull-request').exists)
        .ok('', { timeout: sharedConfig.POLLING_INTERVAL + 3000 });
});
