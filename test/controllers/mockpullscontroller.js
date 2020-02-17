const pulls = require('../fixtures/pulls');

class MockPullsController {
    static async list (req, res) {
        res.json(pulls);
    }
}

module.exports = MockPullsController;
