require('dotenv').config();

module.exports = {
    DEFAULT_PORT:   process.env.PORT || 3000,
    DEFAULT_HOST:   process.env.HOST || '127.0.0.1',
    OWNER:          process.env.OWNER || null,
    REPO:           process.env.REPO || null,
    GITHUB_API_URL: process.env.GITHUB_API_URL || 'https://api.github.com'
};
