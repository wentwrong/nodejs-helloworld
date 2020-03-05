import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const SLUGS = process.env.SLUGS ? process.env.SLUGS.split(',') : [ 'DevExpress/testcafe' ];

const APP_ROOT: string = path.join(__dirname, '../../');

export default {
    PORT:                   process.env.PORT || 1337,
    HOST:                   process.env.HOST || '127.0.0.1',
    NODE_ENV:               process.env.NODE_ENV || 'production',
    SLUGS,
    API_VERSION:            'v1',
    MOCK_GITHUB_PREFIX:     'mock-github',
    STATIC_DIR:             path.join(APP_ROOT, 'resources/html'),
    STYLESHEETS_DIR:        path.join(APP_ROOT, 'resources/css'),
    CLIENT_SCRIPTS_DIR:     path.join(APP_ROOT, 'lib/client'),
    ROUTES_DIR:             path.join(APP_ROOT, 'lib/server/routes'),
    MOCK_ROUTES_DIR:        path.join(APP_ROOT, 'lib/mock-github/routes'),
    JSON_SETTING_NAME:      'json spaces',
    JSON_SPACES:            2,
    DEFAULT_GITHUB_API_URL: 'https://api.github.com',
    DEFAULT_AVATAR_URL:     'https://avatars3.githubusercontent.com/u/26363017?s=460&v=4'
};
