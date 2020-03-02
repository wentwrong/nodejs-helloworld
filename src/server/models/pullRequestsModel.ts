import { PullRequest } from '../../shared/interfaces/pullRequests';

export default class PullRequestsModel {
    private static _instance: PullRequestsModel = new PullRequestsModel();
    private pullRequests: PullRequest[] = [];

    constructor () {
        if (PullRequestsModel._instance)
            throw new Error('Error: model instantiation failed because it already exists');
        PullRequestsModel._instance = this;
    }

    static getModel (): PullRequestsModel {
        return PullRequestsModel._instance;
    }

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
