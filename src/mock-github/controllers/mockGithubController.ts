import express from 'express';
const pulls = require('../../../test/fixtures/pulls');

export default class MockGithubController {
    static async list (req: express.Request, res: express.Response): Promise<void> {
        res.json(pulls);
    }
}
