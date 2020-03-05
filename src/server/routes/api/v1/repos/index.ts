import express from 'express';
import ReposController from '../../../../controllers/reposController';

export default class ReposRouter {
    static init (): express.Router {
        return express.Router()
            .get('/slugs', ReposController.getSlugs);
    }
}
