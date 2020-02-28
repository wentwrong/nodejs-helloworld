import express from 'express';
import { PullRequest } from '../../shared/interfaces/pullRequests';
import PullRequestsModel from '../../server/models/pullRequestsModel';

export default class MockGithubController {
    static async list (req: express.Request, res: express.Response): Promise<void> {
        const pulls: PullRequest[] = PullRequestsModel
            .getModel()
            .getPullRequests();

        res.json(pulls);
    }
}
