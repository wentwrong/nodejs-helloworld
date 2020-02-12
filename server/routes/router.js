const router = require('express').Router();
const apiRouter = require('./api');

router.use('/api/' + process.env.ACTUAL_API_VERSION, apiRouter);

module.exports = router;
