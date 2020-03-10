import express from 'express';
import { PullRequest } from '../../shared/interfaces/pullRequests';
import pullRequestsModel from '../models/pullRequestsModel';
import { DEFAULT_CONFIG } from '../../server/config';
import wait from '../utils/wait';

export default class MockPullsController {
    async list (req: express.Request, res: express.Response): Promise<void> {
        // NOTE:
        // Imitate some delay
        await wait(DEFAULT_CONFIG.mockAnswerTime);

        const pulls: PullRequest[] = pullRequestsModel.getPullRequests();

        res.json(pulls);
    }
}
