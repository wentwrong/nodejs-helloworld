import { Octokit } from '@octokit/rest';
import { Config } from '../config';

export default function createOctokit (config: Config): Octokit {
    return new Octokit({
        baseUrl: config.githubAPIURL
    });
}
