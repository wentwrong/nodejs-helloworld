import express from 'express';
import ReposController from '../../../../controllers/reposController';
import { RouterWrapper } from '../../../../utils/routes/router';
import { Config } from '../../../../config';
import createOctokit from '../../../../utils/createOctokit';

export default class ReposRouter implements RouterWrapper {
    private controller: ReposController;

    constructor (config: Config) {
        this.controller = new ReposController(config, createOctokit(config));
    }

    init (): express.Router {
        return express.Router()
            .get('/slugs', this.controller.getSlugs.bind(this.controller));
    }
}
