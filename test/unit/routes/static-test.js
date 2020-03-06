import { expect } from 'chai';
import axios from 'axios';
import App from '../../../';

describe('Static', () => {
    const app = new App();

    before(async () => {
        await app.run();
    });

    after(async () => {
        await app.close();
    });

    it(`index should return 200 response`, async () => {
        const response = await axios.get(`http://${app.config.host}:${app.config.port}/`);

        expect(response.data).contain('Dashboard');
        // expect(response.statusCode).equal(200);
    });
});
