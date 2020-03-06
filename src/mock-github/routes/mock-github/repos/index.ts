import express from 'express';
import MockPullsController from '../../../controllers/mockPullsController';
import { RouterWrapper } from '../../../../server/utils/routes/router';

export default class MockPullsRouter implements RouterWrapper {
    private controller: MockPullsController;

    constructor () {
        this.controller = new MockPullsController();
    }

    init (): express.Router {
        return express.Router()
            .get('/:owner/:repo/pulls', this.controller.list.bind(this.controller));
    }
}
