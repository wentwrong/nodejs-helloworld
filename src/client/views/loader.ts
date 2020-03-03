import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import View from './view';

const debug = debugFactory('loader-view');

export default class LoaderView extends View {
    constructor () {
        super();
    }

    async render (): Promise<string> {
        try {
            const loaderTmpl = await this.loadTemplate('loader');

            return Mustache.render(loaderTmpl, {});
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }
}
