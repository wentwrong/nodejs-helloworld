import App from './app';
import MockGithubApp from '../mock-github/mockGithubApp';
import globalErrorHandlers from '../shared/globalErrorHandlers';
import config from './config';

globalErrorHandlers();

if (require.main === module) {
    const app = new App({ port: 1337 });
    const mock = new MockGithubApp({ port: 1338, routesDir: config.MOCK_ROUTES_DIR });

    const mockUrl = `http://${mock.config.host}:${mock.config.port}/${config.MOCK_GITHUB_PREFIX}`;

    app.set(config.GITHUB_API_VAR_NAME, mockUrl);

    app.run();
    mock.run();
}
