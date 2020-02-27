import { PullRequestList } from '../../shared/interfaces/pullRequests';
import debugFactory from '../../shared/debugFactory';

const debug = debugFactory('pulls-controller');

export default class PullsController {
    static async list (): Promise<PullRequestList> {
        try {
            const response = await fetch('api/v1/pulls/list');

            const pulls = await response.json();

            debug.log(`Fetched ${pulls.pullRequestList.length} pull requests`);
            debug.log(pulls);

            return pulls;
        }
        catch (err) {
            debug.error('Error occured when fetching Pull Requests');
            debug.error(err);

            throw err;
        }
    }
}
