window
    .addEventListener('unhandledrejection', async e => {
        e.preventDefault();
        const err = (e.reason.stack || e.reason).toString();

        console.log(err);

        await errorRegister(err);
    });

window
    .addEventListener('error', async e => {
        e.preventDefault();
        const msg = [
            'Message: ' + e.message,
            'URL: ' + e.filename,
            'Line: ' + e.lineno,
            'Column: ' + e.colno,
            'Error object: ' + JSON.stringify(e.error)
        ].join('\n');

        console.log(msg);

        await errorRegister(msg);
    });

async function errorRegister (data: string): Promise<void> {
    try {
        await fetch('api/v1/errors/register', {
            method:  'POST',
            body:    JSON.stringify({ error: data }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Error registered');
    }
    catch (err) {
        console.error('Failed to register error');
        console.error(err);
    }
}
