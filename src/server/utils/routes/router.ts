import express from 'express';

export interface RouterWrapper {
    init(): express.Router;
}

export interface Route {
    routePrefix: string;
    Router: RouterWrapper;
}

export function createExpressRouter (Router: RouterWrapper): express.Router {
    return Router.init();
}
