import debug from 'debug';

export default {
    log:   debug('gh-canary:log'),
    warn:  debug('gh-canary:warn'),
    error: debug('gh-canary:error')
};
