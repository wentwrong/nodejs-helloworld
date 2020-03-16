import express from 'express';
import { PullRequest } from '../../shared/interfaces/pullRequests';
import pullRequestsModel from '../models/pullRequestsModel';
import { DEFAULT_CONFIG } from '../../server/config';
import wait from '../utils/wait';
import commentsModel from '../models/commentsModel';

export default class MockPullsController {
    async list (req: express.Request, res: express.Response): Promise<void> {
        // NOTE:
        // Imitate some delay
        await wait(DEFAULT_CONFIG.mockAnswerTime);

        const pulls: PullRequest[] = pullRequestsModel.getPullRequests();

        res.json(pulls);
    }

    async addComment (req: express.Request, res: express.Response): Promise<void> {
        if (req.headers?.authorization === `token ${DEFAULT_CONFIG.githubAuthToken}`) {
            commentsModel.addComment({
                pullRequest: {
                    owner:          req.params.owner,
                    repo:           req.params.repo,
                    'issue_number': parseInt(req.params.issue_number, 10)
                },
                commentMsg: req.body.body as string
            });

            res.json({ message: 'Comment was sent' });
        }
        else
            res.status(401).send('Bad credentials');
    }
}
