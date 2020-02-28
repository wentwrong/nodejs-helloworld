import express from 'express';
import config from '../config';

export default class ReposController {
    static async getSlug (req: express.Request, res: express.Response): Promise<void> {
        res.send({ slug: `${config.OWNER}/${config.REPO}` });
    }
}
