const pulls = require('../mock-data/mock-pulls');

class MockPullsController {
    static async list (req, res) {
        res.json(pulls);
    }
}

module.exports = MockPullsController;
