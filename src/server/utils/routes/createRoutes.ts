import path from 'path';
import globby from 'globby';
import express from 'express';
import debug from '../../debug';
import { Route, createExpressRouter } from './router';

function filenameToRoute (filename: string, routesDir: string): Route {
    const { default: router } = require(path.resolve(path.join(routesDir, filename)));

    return {
        routePrefix: path.dirname(filename),
        Router:      router
    };
}

export default async function createRoutes (routesDir: string): Promise<express.Router> {
    const mainRouter = express.Router();

    try {
        const files = await globby('**/*.js', { cwd: routesDir });

        files
            .map(filename => filenameToRoute(filename, routesDir))
            .map(({ routePrefix, Router }) => mainRouter.use(`/${routePrefix}`, createExpressRouter(Router)));

        return mainRouter;
    }
    catch (err) {
        debug.error('An error has occured when processing app routes');
        debug.error(err);
        throw err;
    }
}
