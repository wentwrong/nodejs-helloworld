const { expect } = require('chai');
const got = require('got');
const App = require('../../');

describe('Static', () => {
    const app = new App();

    before(async () => {
        await app.run();
    });

    after(async () => {
        await app.close();
    });

    it(`index should return 200 response`, async () => {
        const response = await got(`http://${app.server.host}:${app.server.port}/`);

        expect(response.body).contain('Dashboard');
        expect(response.statusCode).equal(200);
    });
});
