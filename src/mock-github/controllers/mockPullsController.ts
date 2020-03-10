import express from 'express';
import { PullRequest } from '../../shared/interfaces/pullRequests';
import pullRequestsModel from '../models/pullRequestsModel';

export default class MockPullsController {
    async list (req: express.Request, res: express.Response): Promise<void> {
        const pulls: PullRequest[] = await pullRequestsModel.getPullRequests();

        res.json(pulls);
    }
}
