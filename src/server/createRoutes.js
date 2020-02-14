const path = require('path');
const globby = require('globby');
const debug = require('./debug');
const express = require('express');
const mainRouter = express.Router();

async function createRoutes (routesDir) {
    try {
        const files = await globby('**/*.js', { cwd: path.resolve(routesDir) });

        files
            .filter(filename => !filename.endsWith('-test.js'))
            .map(filename => ({
                routePrefix: path.dirname(filename),
                Router:      require(path.join('../../', routesDir, filename))
            }))
            .filter(({ Router }) => Object.getPrototypeOf(Router) === express.Router)
            .map(({
                routePrefix,
                Router
            }) => mainRouter.use(`/${routePrefix}`, new Router()));

        return mainRouter;
    }
    catch (err) {
        debug.error('An error has occured when processing app routes');
        debug.error(err);
        throw err;
    }
}

module.exports = createRoutes;
