import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import loadTemplate from '../utils/loadTemplate';

const debug = debugFactory('error-component');

export default class ErrorComponent extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback (): Promise<void> {
        await this.render();
    }

    async render (): Promise<void> {
        try {
            const errorTmpl = await loadTemplate('error');

            this.innerHTML = Mustache.render(errorTmpl, {});
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }
}
