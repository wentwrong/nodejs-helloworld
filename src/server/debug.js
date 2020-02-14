const debug = require('debug');

module.exports = {
    log:    debug('gh-canary:log'),
    warn:   debug('gh-canary:warn'),
    error:  debug('gh-canary:error'),
    morgan: debug('morgan:log')
};
