require('dotenv').config();

[ process.env.OWNER, process.env.REPO ] = process.env.REPO_SLUG ? process.env.REPO_SLUG.split('/') : [ null, null ];

process.env.PORT = process.env.PORT || 3000;
process.env.HOST = process.env.HOST || '127.0.0.1';
process.env.ACTUAL_API_VERSION = 'v1';
process.env.GITHUB_API_URL = process.env.GITHUB_API_URL || 'https://api.github.com';
