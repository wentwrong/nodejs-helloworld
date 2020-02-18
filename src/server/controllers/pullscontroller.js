const config = require('../config');
const debug = require('../debug');
const { Octokit } = require('@octokit/rest');

class PullsController {
    static async list (req, res) {
        const octokit = Octokit({
            baseUrl: req.app.get(config.GITHUB_API_VAR_NAME) || config.DEFAULT_GITHUB_API_URL
        });

        const options = octokit.pulls.list.endpoint.merge({
            owner: config.OWNER,
            repo:  config.REPO
        });

        try {
            const pullRequests = [];

            for await (const page of octokit.paginate.iterator(options))
                pullRequests.push(page['data'].filter(pr => pr['author_association'] === 'NONE'));

            res.send({ pullRequestList: pullRequests.flat() });
        }
        catch (err) {
            debug.error(`An error has happened when ${req.ip} requests ${req.path}`);
            debug.error(err);

            res
                .status(500)
                .json({ error: 'An error has occured while fetching pull-requests from server.' });
        }
    }

    static async addComment (req, res) {
        return res.json({ message: 'NOT IMPLEMENTED YET' });
    }
}

module.exports = PullsController;
