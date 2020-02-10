const debug = require('debug');

module.exports = {
    log:   debug('gh-canary:log'),
    error: debug('gh-canary:error')
};
