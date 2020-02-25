import express from 'express';
import PullsController from '../../../../controllers/pullsController';

export default class PullsRouter {
    static init (): express.Router {
        return express.Router()
            .get('/list', PullsController.list)
            .post('/addComment', PullsController.addComment);
    }
}
