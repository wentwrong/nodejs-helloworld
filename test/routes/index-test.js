const { expect } = require('chai');
const got = require('got');
const App = require('../../src/index');

describe('Index', () => {
    const app = new App();

    before(async () => {
        await app.run();
    });

    after(async () => {
        await app.close();
    });

    it(`should return 200 response`, async () => {
        const response = await got(`http://${app.server.host}:${app.server.port}/`);

        expect(response.body).contain('Dashboard');
        expect(response.statusCode).equal(200);
    });
});
