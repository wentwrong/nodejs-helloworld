import App from './app';
import MockGithubApp from '../mock-github/mockGithubApp';
import globalErrorHandlers from '../server/globalErrorHandlers';
import { DEFAULT_CONFIG } from './config';
import pullRequestsModel from '../mock-github/models/pullRequestsModel';

globalErrorHandlers();

if (require.main === module) {
    const mock = new MockGithubApp({ port: 1338, routesDir: DEFAULT_CONFIG.mockRoutesDir });
    const mockUrl = `http://${mock.config.host}:${mock.config.port}/${DEFAULT_CONFIG.mockPrefix}`;

    const app = new App({
        port:         1337,
        githubAPIURL: mockUrl,
        slugs:        ['wentwrong/gh-canary']
    });

    pullRequestsModel.generateMockPullRequests(DEFAULT_CONFIG.numOfMockPullRequests);

    app.run();
    mock.run();
}
