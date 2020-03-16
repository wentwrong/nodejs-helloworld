import express from 'express';
import MockUsersController from '../../../controllers/mockUsersController';

export default class MockUsersRouter {
    private controller: MockUsersController;

    constructor () {
        this.controller = new MockUsersController();
    }

    init (): express.Router {
        return express.Router()
            .get('/:username', this.controller.infoByUsername.bind(this.controller));
    }
}
