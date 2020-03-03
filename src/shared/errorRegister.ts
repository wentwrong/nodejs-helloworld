import debugFactory from './debugFactory';

const debug = debugFactory('error-register');

export default async (data: Error): Promise<void> => {
    try {
        await fetch('api/v1/errors/register', {
            method:  'POST',
            body:    JSON.stringify({ error: data }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        debug.log('Error registered');
    }
    catch (err) {
        debug.error('Failed to register error');
        debug.error(err);
    }
};
