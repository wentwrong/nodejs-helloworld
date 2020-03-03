import { PullRequestList } from '../shared/interfaces/pullRequests';
import { createPullsPage, createLoader } from './templates';
import PullsController from './controllers/pullsController';
import ReposController from './controllers/reposController';
import errorRegister from '../shared/errorRegister';
import debugFactory from '../shared/debugFactory';
import { reloadBtnClick } from './eventhandler';
import { ClientApp } from './interfaces/clientApp';
import config from '../shared/sharedConfig';

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
            const pulls: PullRequestList = await PullsController.list();
            const slug: string = await ReposController.getSlug();

            this.setRoot(createPullsPage(pulls, slug));
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

        if (reloadButton) {
            const cb = (): void => reloadBtnClick(this);

            reloadButton.addEventListener('click', cb);
            setInterval(cb, config.POLLING_INTERVAL);
        }
        else
            throw new Error('Button with id = reload-btn was not found');
    }
}
