import debugFactory from './debugFactory';
import errorRegister from './errorRegister';

const debug = debugFactory('global-error-handlers');

export default async (): Promise<void> => {
    if (typeof window === 'undefined') {
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
    }
    else {
        window
            .addEventListener('unhandledrejection', async e => {
                e.preventDefault();
                debug.error('Unhandled promise rejection');
                debug.error(e);
                const err = (e.reason.stack || e.reason).toString();

                await errorRegister(err);
            });
        window
            .addEventListener('error', async e => {
                e.preventDefault();
                debug.error('Uncaught exception');
                debug.error(e);
                const msg = [
                    'Message: ' + e.message,
                    'URL: ' + e.filename,
                    'Line: ' + e.lineno,
                    'Column: ' + e.colno,
                    'Error object: ' + JSON.stringify(e.error)
                ].join('\n');

                await errorRegister(msg);
            });
    }
};
