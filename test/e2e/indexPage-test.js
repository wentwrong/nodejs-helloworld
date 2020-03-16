import App from '../../';
import { DEFAULT_CONFIG } from '../../lib/server/config';
import sharedConfig from '../../lib/shared/sharedConfig';
import MockGithubApp from '../../lib/mock-github/mockGithubApp';
import pullRequestsModel from '../../lib/mock-github/models/pullRequestsModel';
import commentsModel from '../../lib/mock-github/models/commentsModel';
import page from './pages/indexPage';

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
    .beforeEach(async t => {
        pullRequestsModel.clear();

        await t
            .expect(page.noPullRequestsDiv.exists)
            .ok();
    });

test(`Pull Requests dynamically updated with time (${sharedConfig.POLLING_INTERVAL} ms interval)`, async t => {
    pullRequestsModel.generateMockPullRequests(1);

    await t
        .expect(page.pullRequestDiv.exists)
        .ok('', { timeout: sharedConfig.POLLING_INTERVAL + 3000 });
});

test(`Pull Requests updated via click on reload button`, async t => {
    pullRequestsModel.generateMockPullRequests(1);

    await page.clickReloadPullRequestsBtn();

    await t
        .expect(page.pullRequestDiv.exists)
        .ok();
});

test(`Comment not sent when did not choose any pull request
    (toast "Select some pull requests first" should appear)`, async t => {
    await page.clickShowModalWindowBtn();

    await page.clickSentComment();

    await t
        .expect(page.lastToast.textContent)
        .eql('Select some pull requests first');
});

test(`Comment sent when pull requests checked`, async t => {
    const numOfPullRequests = 3;

    pullRequestsModel.generateMockPullRequests(numOfPullRequests);

    await page.clickReloadPullRequestsBtn();

    await t.expect(page.pullRequestCheckboxes.exists).ok();

    const numOfCheckboxes = await page.pullRequestCheckboxes.count;

    for (let i = 0; i < numOfCheckboxes; i++) {
        await t
            .click(page.pullRequestSpanCheckboxes.nth(i))
            .expect(page.pullRequestCheckboxes.nth(i).checked).ok();
    }

    await page.clickShowModalWindowBtn();
    await page.clickSentComment();

    await t
        .expect(page.lastToast.textContent)
        .eql(`Your comment was added to ${numOfPullRequests} pull requests`);

    await t
        .expect(commentsModel.getComments().length)
        .eql(numOfPullRequests);
});
