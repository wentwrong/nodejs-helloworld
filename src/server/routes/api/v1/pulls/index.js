import express from 'express';
import PullsController from '../../../../controllers/pullsController';

export default class PullsRouter extends express.Router {
    constructor (...props) {
        super(...props);

        this
            .get('/list', PullsController.list)
            .post('/addComment', PullsController.addComment);
    }
}
