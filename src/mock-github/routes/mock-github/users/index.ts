import express from 'express';
import MockUsersController from '../../../controllers/mockUsersController';

export default class MockUsersRouter {
    static init (): express.Router {
        return express.Router()
            .get('/:username', MockUsersController.infoByUsername);
    }
}
