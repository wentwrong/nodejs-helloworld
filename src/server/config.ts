import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const [ OWNER, REPO ] = process.env.REPO_SLUG ? process.env.REPO_SLUG.split('/') : [ 'DevExpress', 'testcafe' ];

const APP_ROOT: string = path.join(__dirname, '../../');

export default {
    PORT:                   process.env.PORT || 1337,
    MOCK_PORT:              process.env.MOCK_PORT || 1338,
    HOST:                   process.env.HOST || '127.0.0.1',
    MOCK_HOST:              process.env.MOCK_HOST || '127.0.0.1',
    NODE_ENV:               process.env.NODE_ENV || 'production',
    OWNER,
    REPO,
    API_VERSION:            'v1',
    MOCK_GITHUB_PREFIX:     'mock-github',
    STATIC_DIR:             path.join(APP_ROOT, 'resources/html'),
    CLIENT_SCRIPTS_DIR:     path.join(APP_ROOT, 'lib/client'),
    ROUTES_DIR:             path.join(APP_ROOT, 'lib/server/routes'),
    MOCK_ROUTES_DIR:        path.join(APP_ROOT, 'lib/mock-github/routes'),
    JSON_SETTING_NAME:      'json spaces',
    JSON_SPACES:            2,
    DEFAULT_GITHUB_API_URL: 'https://api.github.com',
    GITHUB_API_VAR_NAME:    'github-api-url'
};
