const path = require('path');
const globby = require('globby');
const debug = require('../debug');
const mainRouter = require('express').Router();

async function createRoutes (routesDir) {
    try {
        return (await globby('**/!(index.js)/*.js', {
            cwd: path.resolve(routesDir)
        }))
            .map(filename => ({
                routePrefix: path.dirname(filename),
                Router:      require(`./${filename}`)
            }))
            .reduce((rootRouter, {
                routePrefix,
                Router
            }) => rootRouter.use(`/${routePrefix}`, new Router()), mainRouter);
    }
    catch (err) {
        debug.error('An error has occured when processing app routes');
        debug.error(err);
        throw err;
    }
}

module.exports = createRoutes;
