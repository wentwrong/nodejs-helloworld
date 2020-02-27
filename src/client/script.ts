import { PullRequestList } from '../shared/interfaces/pullRequests';
import { createPullsPage, createLoader } from './templates';
import pullsController from './controllers/pullsController';
import errorRegister from '../shared/errorRegister';
import debugFactory from '../shared/debugFactory';
import { reloadBtnClick } from './eventhandler';
import { ClientApp } from './interfaces/clientApp';

const debug = debugFactory('app');

export default class App implements ClientApp {
    async init (): Promise<void> {
        try {
            this.setRoot(createLoader());
            this.setEventHandlers();
        }
        catch (err) {
            debug.error(err);

            await errorRegister(err.stack);
        }
    }

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

    setRoot (html: string): void {
        const output = document?.getElementById('root');

        if (output)
            output.innerHTML = html;
        else
            throw new Error('Div with id = root was not found');
    }

    private setEventHandlers (): void {
        const reloadButton = document?.getElementById('reload-btn');

        if (reloadButton)
            reloadButton.addEventListener('click', () => reloadBtnClick(this));
        else
            throw new Error('Button with id = reload-btn was not found');
    }
}
