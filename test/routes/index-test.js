const { expect } = require('chai');
const got = require('got');

const App = require('../../src/app');

describe('Index page', () => {
    const apps = [3001, 3002, 3003].map(port => new App({ port }));

    before(() => {
        apps.forEach(app => app.run());
    });

    after(() => {
        apps.forEach(app => app.close());
    });

    it('all apps should show "Hello Node.js" message', async () => {
        apps.forEach(async app => {
            const response = await got(`http://${app.server.host}:${app.server.port}`);

            expect(response.statusCode).equal(200);
            expect(response.body).include('Hello Node.js');
        });
    });
});
