import express from 'express';
import { Octokit } from '@octokit/rest';
import { Config } from '../config';
import debugFactory from '../../shared/debugFactory';
import { Slug } from '../../shared/interfaces/slug';

const debug = debugFactory('repos-controller');

export default class ReposController {
    // TODO:
    // Dependency injection
    constructor (private config: Config, private octokit: Octokit) { }

    /**
     * Response with array of { `slug` and owner avatar url }
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @returns {Promise<void>}
     * @memberof ReposController
     */
    async getSlugs (req: express.Request, res: express.Response): Promise<void> {
        try {
            const slugs = await Promise.all(
                this.config.slugs.map(async slug => await this.getAvatar(slug))
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
     * @param {string} slug
     * @memberof ReposController
     */
    private async getAvatar (slug: string): Promise<Slug> {
        // TODO:
        // cache avatar images

        const usernameInfo = await this.octokit.users.getByUsername({ username: slug.split('/')[0] });

        return { data: slug, avatar: usernameInfo.data.avatar_url };
    }
}
