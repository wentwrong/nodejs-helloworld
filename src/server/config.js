require('dotenv').config();
const debug = require('./debug');

process
    .on('unhandledRejection', reason => {
        debug.error('Unhandled promise rejection');
        debug.error(reason);
    })
    .on('uncaughtException', err => {
        debug.error('Uncaught exception');
        debug.error(err);
        throw err;
    });

const [ OWNER, REPO ] = process.env.REPO_SLUG ? process.env.REPO_SLUG.split('/') : [ 'DevExpress', 'testcafe' ];

module.exports = {
    PORT:                   process.env.PORT || 1337,
    MOCK_PORT:              process.env.MOCK_PORT || 1338,
    HOST:                   process.env.HOST || '127.0.0.1',
    MOCK_HOST:              process.env.MOCK_HOST || '127.0.0.1',
    NODE_ENV:               process.env.NODE_ENV || 'production',
    OWNER,
    REPO,
    API_VERSION:            'v1',
    MOCK_GITHUB_PREFIX:     'mock-github',
    STATIC_DIR:             'src/client/public',
    ROUTES_DIR:             'src/server/routes',
    MOCK_ROUTES_DIR:        'test/routes',
    DEFAULT_GITHUB_API_URL: 'https://api.github.com',
    GITHUB_API_VAR_NAME:    'github-api-url'
};
