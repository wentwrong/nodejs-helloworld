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
    });

const [ OWNER, REPO ] = process.env.REPO_SLUG ?
    process.env.REPO_SLUG.split('/') : [ null, null ];

module.exports = {
    PORT:               process.env.PORT || 3000,
    HOST:               process.env.HOST || '127.0.0.1',
    NODE_ENV:           process.env.NODE_ENV || 'production',
    OWNER,
    REPO,
    API_PREFIX:         '/api/v1',
    MOCK_GITHUB_PREFIX: '/github-api',
    STATIC_DIR:         'src/client/public',
    ROUTES_DIR:         'src/server/routes',
    GITHUB_API_URL:     'https://api.github.com'
};
