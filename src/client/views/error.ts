import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import View from './view';

const debug = debugFactory('error-view');

export default class LoaderView extends View {
    constructor () {
        super();
    }

    async render (): Promise<string> {
        try {
            const errorTmpl = await this.loadTemplate('error');

            return Mustache.render(errorTmpl, {});
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }
}
