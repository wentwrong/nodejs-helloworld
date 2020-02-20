import debug from './debug';

export default () => {
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
