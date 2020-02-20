import pulls from '../fixtures/pulls';

export default class MockPullsController {
    static async list (req, res) {
        res.json(pulls);
    }
}
