import path from 'path';
const globby = require('globby');
const debug = require('./debug');
const express = require('express');

async function filenameToRoute (filename, routesDir) {
    const { default: router } = await import(path.resolve(path.join(routesDir, filename)));

    return {
        routePrefix: path.dirname(filename),
        Router:      router
    };
}

async function createRoutes (routesDir) {
    const mainRouter = express.Router();

    try {
        const files = await globby('**/*.js', { cwd: routesDir });

        const routerPromises = files
            .filter(filename => !filename.endsWith('-test.js'))
            .map(async filename => await filenameToRoute(filename, routesDir));
        
        const routers = await Promise.all(routerPromises);
        
        routers.map(({ routePrefix, Router }) => mainRouter.use(`/${routePrefix}`, new Router()));

        return mainRouter;
    }
    catch (err) {
        debug.error('An error has occured when processing app routes');
        debug.error(err);
        throw err;
    }
}

module.exports = createRoutes;
