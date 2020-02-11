const express = require('express');
const { Octokit } = require('@octokit/rest');
const constants = require('./config');
const pullRequestsPage = require('../views/templates');

const router = express.Router();
const octokit = Octokit({
    baseUrl: constants.GITHUB_API_URL
});

router.get('/', async (req, res) => {
    res.send('Hello Node.js');
});

router.get('/get-prs', async (req, res) => {
    const options = octokit.pulls.list.endpoint.merge({
        owner: process.env.OWNER,
        repo:  process.env.REPO
    });

    const prs = [];

    for await (const page of octokit.paginate.iterator(options))
        prs.push(page['data'].filter(pr => pr['author_association'] === 'NONE'));

    res.send(
        pullRequestsPage({
            pullRequestList: prs.flat(),
            owner:           constants.OWNER,
            repo:            constants.REPO
        })
    );
});

module.exports = router;
