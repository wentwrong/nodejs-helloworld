import express from 'express';

export interface RouterWrapper {
    init(): express.Router;
}

/**
 * Helps with mapping router `Router` to endpoint-path `routePrefix`
 *
 * @export
 * @interface Route
 */
export interface Route {
    routePrefix: string;
    Router: RouterWrapper;
}

/**
 * Creates express router from custom router
 *
 * @export
 * @param {RouterWrapper} Router
 * @returns {express.Router}
 */
export function createExpressRouter (Router: RouterWrapper): express.Router {
    return Router.init();
}
