import { PullRequestList } from '../shared/interfaces/pullRequests';
import { createPullsPage, createErrorPage } from './templates';
import pullsController from './controllers/pullsController';
import debugFactory from '../shared/debugFactory';
import globalErrorHandlers from '../shared/globalErrorHandlers';

const debug = debugFactory('client');

export default class App {
    constructor () {
        globalErrorHandlers();
    }

    async render (): Promise<void> {
        try {
            const pulls: PullRequestList = await pullsController.list();

            debug.log(`Fetched ${pulls.pullRequestList.length} pull requests`);
            debug.log(pulls);

            this.setRoot(createPullsPage(pulls));
        }
        catch (err) {
            debug.error('Error occured when fetching Pull Requests');
            debug.error(err);
            this.setRoot(createErrorPage());
            throw err;
        }
    }

    private setRoot (html: string): void {
        const output = document?.getElementById('root');

        if (output)
            output.innerHTML = html;
        else
            throw new Error('Div with id = root was not found');
    }
}
