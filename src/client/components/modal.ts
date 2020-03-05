import M from 'materialize-css';
import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import loadTemplate from '../utils/loadTemplate';

const debug = debugFactory('modal-component');

export default class PullRequestsComponent extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback (): Promise<void> {
        await this.render();
    }

    async render (): Promise<void> {
        try {
            const modalTemplate = await loadTemplate('modal');

            this.innerHTML = Mustache.render(modalTemplate, {});

            M.Modal.init(document.querySelectorAll('.modal'));
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }
}
