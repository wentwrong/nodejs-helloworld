import debug from 'debug';

interface DebugFunctions {
    log: debug.Debugger;
    warn: debug.Debugger;
    error: debug.Debugger;
}

export default function debugFactory (subsystem: string): DebugFunctions {
    return {
        log:   debug(`gh-canary:${subsystem}:log`),
        warn:  debug(`gh-canary:${subsystem}:warn`),
        error: debug(`gh-canary:${subsystem}:error`)
    };
}
