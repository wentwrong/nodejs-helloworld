require('dotenv').config();

module.exports = {
    DEFAULT_PORT: process.env.PORT || 3000,
    DEFAULT_HOST: process.env.HOST || '127.0.0.1'
};
