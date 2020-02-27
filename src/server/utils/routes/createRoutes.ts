import path from 'path';
import globby from 'globby';
import express from 'express';
import debugFactory from '../../../shared/debugFactory';
import { Route, createExpressRouter } from './router';

const debug = debugFactory('router');

/**
 * Import router file from passed `@routesDir`
 *
 * @param {string} filename
 * @param {string} routesDir
 * @returns {Route}
 */
function filenameToRoute (filename: string, routesDir: string): Route {
    const { default: router } = require(path.resolve(path.join(routesDir, filename)));

    debug.log(`Created route '/${path.dirname(filename)}' from file '${path.join(routesDir, filename)}'`);

    return {
        routePrefix: path.dirname(filename),
        Router:      router
    };
}

/**
 * Maps router files to endpoint-paths based on file location inside `routesDir`
 *
 * Example:
 *
 * file     `routes/api/v1/pulls/index.ts`
 * maps to
 * endpoint `/api/v1/pulls`
 *
 * @export
 * @param {string} routesDir
 * @returns {Promise<express.Router>}
 */
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
