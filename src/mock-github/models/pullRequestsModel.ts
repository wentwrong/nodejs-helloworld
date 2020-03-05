import { PullRequest } from '../../shared/interfaces/pullRequests';

class PullRequestsModel {
    private pullRequests: PullRequest[] = [];

    getPullRequests (): PullRequest[] {
        return this.pullRequests;
    }

    addPullRequest (pullRequest: PullRequest): void {
        this.pullRequests.push(pullRequest);
    }

    clear (): void {
        this.pullRequests = [];
    }
}

export default new PullRequestsModel();
