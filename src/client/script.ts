import { PullRequestList } from '../shared/interfaces/pullRequests';
import { createPullsPage, createErrorPage } from './templates';
import pullsController from './controllers/pullsController';

export default class App {
    async render (): Promise<void> {
        try {
            const pulls: PullRequestList = await pullsController.list();

            console.log(pulls);
            this.setRoot(createPullsPage(pulls));
        }
        catch (err) {
            this.setRoot(createErrorPage());
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
