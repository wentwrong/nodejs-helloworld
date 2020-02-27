import express from 'express';
import ErrorRegisterController from '../../../../controllers/errorRegisterController';

export default class ErrorRegisterRouter {
    static init (): express.Router {
        return express.Router()
            .post('/register', ErrorRegisterController.add);
    }
}
