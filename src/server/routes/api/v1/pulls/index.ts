import express from 'express';
import PullsController from '../../../../controllers/pullsController';

/**
 * Router that maps endpoint-paths with suitable controller methods
 *
 * @export
 * @class PullsRouter
 */
export default class PullsRouter {
    static init (): express.Router {
        return express.Router()
            .get('/list', PullsController.list)
            .post('/addComment', PullsController.addComment);
    }
}
