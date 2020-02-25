import { PullRequestList } from '../../shared/interfaces/pullRequests';

export default class PullsController {
    static async list (): Promise<PullRequestList> {
        const response = await fetch('api/v1/pulls/list');

        return await response.json();
    }
}
