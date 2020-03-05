import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import loadTemplate from '../utils/loadTemplate';

const debug = debugFactory('header-component');

export default class HeaderComponent extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback (): Promise<void> {
        await this.render();
    }

    async render (): Promise<void> {
        try {
            const headerTemplate = await loadTemplate('header');

            this.innerHTML = Mustache.render(headerTemplate, {});

            const reloadButton = document.getElementById('reload-btn');

            if (reloadButton)
                reloadButton.addEventListener('click', () => this.dispatchEvent(new CustomEvent('reloadButtonClicked')));
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }
}
