const { expect } = require('chai')
const got = require('got');

const { server } = require('../../src/index') 

describe('Index page', () => {
    before(async () => {
        await server.start();
        // console.log(`Server started on ${server.host}:${server.port}`);
    });
    
    after(async () => {
        await server.stop();
        // console.log('Server is down')
    });

    it('should show "Hello Node.js" message', async () => {
        const response = await got(`http://${server.host}:${server.port}`);
        expect(response.body).include("Hello Node.js");
    })
})