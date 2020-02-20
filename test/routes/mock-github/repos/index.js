import express from 'express';
import mockPullsController from '../../../controllers/mockPullsController';

export default class MockPullsRouter extends express.Router {
    constructor (...props) {
        super(...props);

        this
            .get('/:owner/:repo/pulls', mockPullsController.list);
    }
}
