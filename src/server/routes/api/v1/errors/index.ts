import express from 'express';
import ErrorRegisterController from '../../../../controllers/errorRegisterController';
import { RouterWrapper } from '../../../../utils/routes/router';

export default class ErrorRegisterRouter implements RouterWrapper {
    private controller: ErrorRegisterController;

    constructor () {
        this.controller = new ErrorRegisterController();
    }

    init (): express.Router {
        return express.Router()
            .post('/register', this.controller.add.bind(this.controller));
    }
}
