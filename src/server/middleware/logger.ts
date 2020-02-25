import express from 'express';
import debug from '../debug';

export default function customLogger (req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.on('finish', () => {
        const utfDateTime = new Date().toUTCString();

        debug.log(`[${utfDateTime}] - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });

    next();
}
