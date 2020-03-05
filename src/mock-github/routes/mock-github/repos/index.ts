import express from 'express';
import MockPullsController from '../../../controllers/mockPullsController';

export default class MockPullsRouter {
    static init (): express.Router {
        return express.Router()
            .get('/:owner/:repo/pulls', MockPullsController.list);
    }
}
