import express from 'express';
import MockGithubController from '../../../controllers/mockGithubController';

export default class MockGithubRouter {
    static init (): express.Router {
        return express.Router()
            .get('/:owner/:repo/pulls', MockGithubController.list);
    }
}
