const { expect } = require('chai');
const got = require('got');
const App = require('../../src/app');

describe('Index page', () => {
    const app = new App();

    before(async () => {
        await app.run();
    });

    after(async () => {
        await app.close();
    });

    it('app should show "Hello Node.js" message', async () => {
        const response = await got(`http://${app.server.host}:${app.server.port}`);

        expect(response.statusCode).equal(200);
        expect(response.body).include('Hello Node.js');
    });
});
