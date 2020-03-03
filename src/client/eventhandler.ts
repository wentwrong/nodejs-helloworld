import { ClientApp } from './interfaces/clientApp';
import { createLoader } from './templates';

export function reloadBtnClick (app: ClientApp): void {
    app.setRoot(createLoader());
    app.render();
}
