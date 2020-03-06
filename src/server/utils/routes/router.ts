import express from 'express';
import { Config } from '../../config';
import createOctokit from '../createOctokit';
import { Octokit } from '@octokit/rest';

export interface RouterConstructor {
    new (config: Config, octokit?: Octokit): RouterWrapper;
}

export interface RouterWrapper {
    init (): express.Router;
}

/**
 * Helps with mapping router `Router` to endpoint-path `routePrefix`
 *
 * @export
 * @interface Route
 */
export interface Route {
    routePrefix: string;
    Router: RouterConstructor;
}

export function createExpressRouter (Router: RouterConstructor, config: Config): express.Router {
    const router = new Router(config, createOctokit(config));

    return router.init();
}
