import { PullRequestList } from '../../shared/interfaces/pullRequests';
import debugFactory from '../../shared/debugFactory';
import errorRegister from '../../shared/errorRegister';
import { PullRequestInfo } from '../../shared/interfaces/pullRequestInfo';

const debug = debugFactory('pulls-controller');

export default class PullsController {
    private static endpointURL = 'api/v1/pulls';

    static async addComment (pulls: PullRequestInfo[], commentMsg: string): Promise<void> {
        try {
            const endpointUrl = `${this.endpointURL}/addComment`;

            const response = await fetch(endpointUrl, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pulls, commentMsg })
            });

            debug.log(`Endpoint ${endpointUrl} answer with response`);
            debug.log(response);

            if (response.status !== 200)
                throw new Error(`Endpoint ${endpointUrl} answer with HTTP status code ${response.status}`);
        }
        catch (err) {
            debug.log(err);

            await errorRegister(err.stack);
        }
    }

    static async list (): Promise<PullRequestList> {
        try {
            const endpointUrl = `${this.endpointURL}/list`;
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
