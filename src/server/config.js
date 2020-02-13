require('dotenv').config();

const [ OWNER, REPO ] = process.env.REPO_SLUG ?
    process.env.REPO_SLUG.split('/') : [ null, null ];

module.exports = {
    PORT:               process.env.PORT || 3000,
    HOST:               process.env.HOST || '127.0.0.1',
    OWNER,
    REPO,
    API_PREFIX:         '/api/v1',
    MOCK_GITHUB_PREFIX: '/github-api',
    STATIC_DIR:         'src/client/public',
    ROUTES_DIR:         'src/server/routes',
    GITHUB_API_URL:     'https://api.github.com'
};
