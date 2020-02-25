import express from 'express';
import { Octokit } from '@octokit/rest';
import config from '../config';
import debugFactory from '../debug';
import { PullRequest } from '../../shared/interfaces/pullRequests';

const debug = debugFactory('pulls-controller');

export default class PullsController {
    /**
     * Make a request to github API for all pull requests fetching and return it to user
     *
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @returns {Promise<void>}
     * @memberof PullsController
     */
    static async list (req: express.Request, res: express.Response): Promise<void> {
        const octokit = new Octokit({
            baseUrl: req.app.get(config.GITHUB_API_VAR_NAME) || config.DEFAULT_GITHUB_API_URL
        });

        const options = octokit.pulls.list.endpoint.merge({
            owner: config.OWNER,
            repo:  config.REPO
        });

        try {
            const pullRequests = [];

            for await (const page of octokit.paginate.iterator(options)) {
                pullRequests.push(page['data']
                    .filter((pr: PullRequest) => pr['author_association'] === 'NONE'));
            }

            res.send({ pullRequestList: pullRequests.flat() });
        }
        catch (err) {
            debug.error(`An error has happened when ${req.ip} requests ${req.path}`);
            debug.error(err);

            res
                .status(500)
                .json({ error: 'An error has occured while fetching pull-requests from server.' });
        }
    }

    static async addComment (req: express.Request, res: express.Response): Promise<void> {
        res.json({ message: 'NOT IMPLEMENTED YET' });
    }
}
