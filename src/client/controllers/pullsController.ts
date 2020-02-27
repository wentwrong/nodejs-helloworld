import { PullRequestList } from '../../shared/interfaces/pullRequests';
import debugFactory from '../../shared/debugFactory';
import errorRegister from '../../shared/errorRegister';

const debug = debugFactory('pulls-controller');

export default class PullsController {
    static async list (): Promise<PullRequestList> {
        try {
            const endpointUrl = 'api/v1/pulls/list';
            const response = await fetch(endpointUrl);

            debug.log(`Endpoint ${endpointUrl} answer with response`);
            debug.log(response);

            if (response.status !== 200)
                throw new Error(`Endpoint ${endpointUrl} answer with HTTP status code ${response.status}`);

            const pulls: PullRequestList = await response.json();

            debug.log(`Fetched ${pulls.pullRequestList.length} pull requests`);
            debug.log(pulls);

            return pulls;
        }
        catch (err) {
            debug.error('Error occured when fetching Pull Requests');
            debug.error(err);

            await errorRegister(err.stack);

            return { pullRequestList: [] };
        }
    }
}
