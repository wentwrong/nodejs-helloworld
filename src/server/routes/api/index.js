const apiRouter = require('express').Router();
const { Octokit } = require('@octokit/rest');
const debug = require('../../debug');

const octokit = Octokit({
    baseUrl: process.env.GITHUB_API_URL
});

apiRouter.get('/hell', (req, res) => res.send('123'));

apiRouter.get('/pulls', async (req, res, next) => {
    const options = octokit.pulls.list.endpoint.merge({
        owner: process.env.OWNER,
        repo:  process.env.REPO
    });

    const pullRequests = [];

    try {
        for await (const page of octokit.paginate.iterator(options))
            pullRequests.push(page['data'].filter(pr => pr['author_association'] === 'NONE'));
    }
    catch (err) {
        debug.error(`Error happened when ${req.ip} requests ${req.path}`);
        debug.error(err);

        const error = {
            message: 'An error has occured while fetching pull-requests from server.',
            status:  500
        };

        return next(error);
    }

    return res.send({ pullRequestList: pullRequests.flat() });
});

module.exports = apiRouter;
