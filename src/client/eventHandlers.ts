import { ClientApp } from './interfaces/clientApp';
import Renderer from './renderer';
import LoaderView from './views/loader';

/**
 * Callback which executed when user clicked reload button
 *
 * @export
 * @param {ClientApp} app
 * @returns {Promise<void>}
 */
export async function reloadBtnClick (app: ClientApp): Promise<void> {
    app.setRoot(await Renderer.render(new LoaderView()));
    app.render();
}
