import { Octokit } from '@octokit/rest';
import { Config } from '../config';
import debugFactory from '../../shared/debugFactory';

export default function createOctokit (config: Config): Octokit {
    const octokitDebug = debugFactory('octokit');

    return new Octokit({
        baseUrl: config.githubAPIURL,
        log:     {
            debug: octokitDebug.log,
            info:  octokitDebug.log,
            warn:  octokitDebug.warn,
            error: octokitDebug.error
        }
    });
}
