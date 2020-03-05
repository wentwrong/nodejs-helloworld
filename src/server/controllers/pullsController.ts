import express from 'express';
import { Octokit } from '@octokit/rest';
import config from '../config';
import debugFactory from '../../shared/debugFactory';
import { PullRequest } from '../../shared/interfaces/pullRequests';

const debug = debugFactory('pulls-controller');

export default class PullsController {
    // TODO:
    // Dependency Injection
    private static octokit?: Octokit;

    /**
     * Gathering non-collaborator pull requests for all config-specified `slugs`
     *
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @returns {Promise<void>}
     * @memberof PullsController
     */
    static async list (req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!PullsController.octokit) {
                PullsController.octokit = new Octokit({
                    baseUrl: config.DEFAULT_GITHUB_API_URL
                });
            }

            const pulls = await Promise.all(
                config.SLUGS
                    .map(async slug => await PullsController.fetchPullRequests(slug))
            );

            res.send({ pullRequestList: pulls.flat() });
        }
        catch (err) {
            debug.error(`An error has happened when ${req.ip} requests ${req.path}`);
            debug.error(err);

            res
                .status(500)
                .json({ error: 'An error has occured while fetching pull-requests from server.' });
        }
    }

    /**
     * Fetch non-collaborator pull requests from given `slug`
     *
     * @private
     * @static
     * @param {string} slug
     * @returns {Promise<void>}
     * @memberof PullsController
     */
    private static async fetchPullRequests (slug: string): Promise<PullRequest[]> {
        if (!PullsController.octokit)
            throw new Error('Octokit was not init');

        const [ owner, repo ] = slug.split('/');
        const options = PullsController.octokit.pulls.list.endpoint.merge({ owner, repo });

        const onlyNonCollaboratorsFilter = function (response: Octokit.AnyResponse): Octokit.AnyResponse {
            return response.data
                .filter((pr: PullRequest) => pr.author_association === 'NONE');
        };

        const pulls: PullRequest[] = await PullsController.octokit.paginate(options, onlyNonCollaboratorsFilter);

        return pulls;
    }

    static async addComment (req: express.Request, res: express.Response): Promise<void> {
        res.json({ message: 'NOT IMPLEMENTED YET' });
    }
}
