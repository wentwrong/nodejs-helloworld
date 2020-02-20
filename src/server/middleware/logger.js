import debug from '../debug';

export default (req, res, next) => {
    res.on('finish', () => {
        const utfDateTime = new Date().toUTCString();

        debug.log(`[${utfDateTime}] - ${req.method} ${req.originalUrl} - ${res.statusCode}`);
    });
    next();
};
