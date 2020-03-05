import express from 'express';
import { Octokit } from '@octokit/rest';
import config from '../config';
import debugFactory from '../../shared/debugFactory';
import { Slug } from '../../shared/interfaces/slug';

const debug = debugFactory('repos-controller');

export default class ReposController {
    // TODO:
    // Dependency injection
    private static octokit: Octokit;

    /**
     * Response with array of { `slug` and owner avatar url }
     *
     * @static
     * @param {express.Request} req
     * @param {express.Response} res
     * @returns {Promise<void>}
     * @memberof ReposController
     */
    static async getSlugs (req: express.Request, res: express.Response): Promise<void> {
        try {
            if (!ReposController.octokit) {
                ReposController.octokit = new Octokit({
                    baseUrl: config.DEFAULT_GITHUB_API_URL
                });
            }

            const slugs = await Promise.all(
                config.SLUGS.map(async slug => await ReposController.getAvatar(slug))
            );

            res.send({ slugs });
        }
        catch (err) {
            debug.error(`An error has happened when ${req.ip} requests ${req.path}`);
            debug.error(err);

            res
                .status(500)
                .json({ error: 'An error has occured while fetching slugs from server.' });
        }
    }

    /**
     * Get avatar image url by passed `slug`
     *
     * @private
     * @static
     * @param {string} slug
     * @memberof ReposController
     */
    private static async getAvatar (slug: string): Promise<Slug> {
        // TODO:
        // cache avatar images
        if (!ReposController.octokit)
            throw new Error('Octokit was not init!');

        const usernameInfo = await this.octokit.users.getByUsername({ username: slug.split('/')[0] });

        return { data: slug, avatar: usernameInfo.data.avatar_url };
    }
}
