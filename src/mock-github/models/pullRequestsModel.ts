import { PullRequest } from '../../shared/interfaces/pullRequests';
import { DEFAULT_CONFIG } from '../../server/config';
import wait from '../utils/wait';

class PullRequestsModel {
    private pullRequests: PullRequest[] = [];

    async getPullRequests (): Promise<PullRequest[]> {
        // NOTE:
        // Imitate some delay
        await wait(DEFAULT_CONFIG.mockAnswerTime);

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
