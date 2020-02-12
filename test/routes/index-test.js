const { expect } = require('chai');
const got = require('got');
const App = require('../../src/index');

describe('REST API', () => {
    const app = new App();

    before(async () => {
        await app.run();
    });

    after(async () => {
        await app.close();
    });

    it(`GET api/${process.env.ACTUAL_API_VERSION}/pulls/ should return 200 when passed valid repo`, async () => {
        process.env.OWNER = 'wentwrong';
        process.env.REPO = 'gh-canary';

        const response = await got(`http://${app.server.host}:${app.server.port}/api/${process.env.ACTUAL_API_VERSION}/pulls`);

        expect(response.statusCode).equal(200);
    });
});
