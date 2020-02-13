const path = require('path');
const globby = require('globby');
const debug = require('../debug');
const mainRouter = require('express').Router();

async function createRoutes (routesDir) {
    try {
        const files = await globby('**/!(index.js)/*.js', { cwd: path.resolve(routesDir) });

        files
            .map(filename => ({
                routePrefix: path.dirname(filename),
                Router:      require(`./${filename}`)
            }))
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
