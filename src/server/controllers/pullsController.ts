import express from 'express';
import { Octokit } from '@octokit/rest';
import debugFactory from '../../shared/debugFactory';
import { PullRequest } from '../../shared/interfaces/pullRequests';
import { Config } from '../config';
import { PullRequestInfo } from '../../shared/interfaces/ownerRepo';

const debug = debugFactory('pulls-controller');

export default class PullsController {
    // TODO:
    // Dependency Injection
    constructor (private config: Config, private octokit: Octokit) { }

    /**
     * Gathering non-collaborator pull requests for all config-specified `slugs`
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @returns {Promise<void>}
     * @memberof PullsController
     */
    async list (req: express.Request, res: express.Response): Promise<void> {
        try {
            const pulls = await Promise.all(
                this.config.slugs.map(async slug => await this.fetchPullRequests(slug))
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
     * @param {string} slug
     * @returns {Promise<void>}
     * @memberof PullsController
     */
    async fetchPullRequests (slug: string): Promise<PullRequest[]> {
        const [ owner, repo ] = slug.split('/');
        const options = this.octokit.pulls.list.endpoint.merge({ owner, repo });

        const onlyNonCollaboratorsFilter = (response: Octokit.AnyResponse): Octokit.AnyResponse => {
            return response.data
                .filter((pr: PullRequest) => pr.author_association === 'NONE');
        };

        const pulls: PullRequest[] = await this.octokit.paginate(options, onlyNonCollaboratorsFilter);

        return pulls;
    }

    async addComment (req: express.Request, res: express.Response): Promise<void> {
        try {
            const pulls: PullRequestInfo[] = req.body.pulls;
            const commentMsg: string = req.body.commentMsg;

            const fn = (pull: PullRequestInfo): void => {
                const options = {
                    ...pull,
                    body: commentMsg
                };

                this.octokit.issues.createComment(options);
            };

            pulls.map(fn);

            res.json({ message: 'Comment was added successfully' });
        }
        catch (err) {
            debug.error(`An error has happened when ${req.ip} add comment`);
            debug.error(err);

            res
                .status(500)
                .json({ error: 'An error has occured while comment sent' });
        }
    }
}
