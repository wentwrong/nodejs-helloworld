import express from 'express';
import PullsController from '../../../../controllers/pullsController';
import { RouterWrapper } from '../../../../utils/routes/router';
import { Config } from '../../../../config';
import createOctokit from '../../../../utils/createOctokit';

/**
 * Router that maps endpoint-paths with suitable controller methods
 *
 * @export
 * @class PullsRouter
 */
export default class PullsRouter implements RouterWrapper {
    private controller: PullsController;

    constructor (config: Config) {
        this.controller = new PullsController(config, createOctokit(config));
    }

    init (): express.Router {
        return express.Router()
            .get('/list', this.controller.list.bind(this.controller))
            .post('/addComment', this.controller.addComment.bind(this.controller));
    }
}
