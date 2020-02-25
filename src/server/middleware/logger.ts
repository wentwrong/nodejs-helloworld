import express from 'express';
import debugFactory from '../debug';

const debug = debugFactory('http');

/**
 * Custom express middleware for logging user requests
 *
 * @export
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
export default function customLogger (req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.on('finish', () => {
        const utfDateTime = new Date().toUTCString();

        debug.log(`[${utfDateTime}] - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });

    next();
}
