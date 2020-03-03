import View from './views/view';
import ErrorView from './views/error';
import errorRegister from '../shared/errorRegister';
import debugFactory from '../shared/debugFactory';

const debug = debugFactory('renderer');

export default class Renderer {
    static async render (view: View): Promise<string> {
        try {
            return await view.render();
        }
        catch (err) {
            debug.error(err);

            errorRegister(err.stack);

            const errorView = new ErrorView();

            return await errorView.render();
        }
    }
}
