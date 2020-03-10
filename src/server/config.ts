import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const APP_ROOT = path.join(__dirname, '../../');

export interface Config {
    port: string | number;
    host: string;
    slugs: string[];
    apiVersion: string;
    mockPrefix: string;
    mockRoutesDir: string;
    staticDir: string;
    clientScriptsDir: string;
    routesDir: string;
    jsonExpressSettingName: string;
    jsonExpressSettingSpaces: 2;
    githubAPIURL: string;
    defaultGithubAvatarURL: string;
    mockAnswerTime: number;
}

export const DEFAULT_CONFIG = {
    host:                     process.env.HOST || '127.0.0.1',
    port:                     process.env.PORT || 1337,
    slugs:                    process.env.SLUGS?.split(',') || [ 'DevExpress/testcafe' ],
    apiVersion:               process.env.API_VERSION || 'v1',
    mockPrefix:               process.env.MOCK_PREFIX || 'mock-github',
    mockRoutesDir:            process.env.MOCK_ROUTES_DIR || path.join(APP_ROOT, 'lib/mock-github/routes'),
    staticDir:                process.env.STATIC_DIR || path.join(APP_ROOT, 'resources'),
    clientScriptsDir:         process.env.CLIENT_SCRIPTS_DIR || path.join(APP_ROOT, 'lib/client'),
    routesDir:                process.env.ROUTES_DIR || path.join(APP_ROOT, 'lib/server/routes'),
    jsonExpressSettingName:   'json spaces',
    jsonExpressSettingSpaces: 2,
    githubAPIURL:             'https://api.github.com',
    defaultGithubAvatarURL:   'https://avatars3.githubusercontent.com/u/26363017?s=460&v=4',
    mockAnswerTime:           1000
} as Config;

export default function createConfig (config?: Partial<Config>): Config {
    return Object.freeze({ ...DEFAULT_CONFIG, ...config });
}
