import { PullRequest } from '../../shared/interfaces/pullRequests';

const pullRequestMock = require('../../../test/fixtures/pullRequest');

class PullRequestsModel {
    private pullRequests: PullRequest[] = [];

    getPullRequests (): PullRequest[] {
        return this.pullRequests;
    }

    addPullRequest (pullRequest: PullRequest): void {
        this.pullRequests.push(pullRequest);
    }

    generateMockPullRequests (n: number): void {
        this.pullRequests = new Array(n)
            .fill(pullRequestMock)
            .map((pullRequest, index) => ({
                ...pullRequest,
                'html_url': `https://github.com/wentwrong/gh-canary/pull/${index}`,
                'number':   index
            }))
            .reverse();
    }

    clear (): void {
        this.pullRequests = [];
    }
}

export default new PullRequestsModel();
