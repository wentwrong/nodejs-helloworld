const express = require('express');
const PullController = require('../../../../controllers/pullController');

class PullsRouter extends express.Router {
    constructor (...props) {
        super(...props);

        this.get('/list', PullController.list)
            .post('/addComment', PullController.addComment);

    }
}

module.exports = PullsRouter;
