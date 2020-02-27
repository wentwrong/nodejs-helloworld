import { PullRequestList } from '../shared/interfaces/pullRequests';
import { createPullsPage } from './templates';
import pullsController from './controllers/pullsController';
import errorRegister from '../shared/errorRegister';
import debugFactory from '../shared/debugFactory';

const debug = debugFactory('app');

export default class App {
    async render (): Promise<void> {
        try {
            const pulls: PullRequestList = await pullsController.list();

            this.setRoot(createPullsPage(pulls));
        }
        catch (err) {
            debug.error(err);

            await errorRegister(err.stack);
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
