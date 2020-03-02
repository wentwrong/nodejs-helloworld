import debugFactory from '../shared/debugFactory';

const debug = debugFactory('global-error-handlers');

export default async (): Promise<void> => {
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
};

