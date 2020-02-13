const config = require('../config');
const debug = require('../debug');
const { Octokit } = require('@octokit/rest');

class PullController {
    static async list (req, res, next) {
        const octokit = Octokit({
            baseUrl: config.GITHUB_API_URL
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
            debug.error(`Error happened when ${req.ip} requests ${req.path}`);
            debug.error(err);

            const error = {
                message: 'An error has occured while fetching pull-requests from server.',
                status:  500
            };

            next(error);
        }
    }

    static async addComment (req, res) {
        return res.json({ message: 'NOT IMPLEMENTED YET' });
    }
}

module.exports = PullController;