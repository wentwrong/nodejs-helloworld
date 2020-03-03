import { PullRequestList } from '../shared/interfaces/pullRequests';
import Renderer from './renderer';
import PullsController from './controllers/pullsController';
import ReposController from './controllers/reposController';
import errorRegister from '../shared/errorRegister';
import debugFactory from '../shared/debugFactory';
import { reloadBtnClick } from './eventHandlers';
import { ClientApp } from './interfaces/clientApp';
import config from '../shared/sharedConfig';
import PullRequestsView from './views/pullRequests';
import LoaderView from './views/loader';

const debug = debugFactory('app');

export default class App implements ClientApp {
    /**
     * Initialization of App
     * Sets a loader and DOM event handlers
     *
     * @returns {Promise<void>}
     * @memberof App
     */
    async init (): Promise<void> {
        try {
            this.setRoot(await Renderer.render(new LoaderView()));
            this.setEventHandlers();
        }
        catch (err) {
            debug.error(err);

            await errorRegister(err.stack);
        }
    }

    /**
     * Show a page: fetch pull requests and render it
     *
     * @returns {Promise<void>}
     * @memberof App
     */
    async render (): Promise<void> {
        try {
            const pullRequestList: PullRequestList = await PullsController.list();
            const slug: string = await ReposController.getSlug();

            const html = await Renderer.render(new PullRequestsView(pullRequestList, slug));

            this.setRoot(html);
        }
        catch (err) {
            debug.error(err);

            await errorRegister(err.stack);
        }
    }

    /**
     * Insert a content to div element with id = root
     *
     * @param {string} html
     * @memberof App
     */
    setRoot (html: string): void {
        const output = document?.getElementById('root');

        if (output)
            output.innerHTML = html;
        else
            throw new Error('Div with id = root was not found');
    }


    /**
     * Sets a DOM event handlers
     *
     * @private
     * @memberof App
     */
    private setEventHandlers (): void {
        const reloadButton = document?.getElementById('reload-btn');

        if (reloadButton) {
            const cb = async (): Promise<void> => await reloadBtnClick(this);

            reloadButton.addEventListener('click', cb);
            setInterval(cb, config.POLLING_INTERVAL);
        }
        else
            throw new Error('Button with id = reload-btn was not found');
    }
}
