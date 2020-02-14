const express = require('express');
const PullsController = require('../../../../controllers/pullscontroller');

class PullsRouter extends express.Router {
    constructor (...props) {
        super(...props);

        this.get('/list', PullsController.list)
            .post('/addComment', PullsController.addComment);
    }
}

module.exports = PullsRouter;
