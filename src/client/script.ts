import { createPullsPage, createErrorPage } from './templates';
import pullsController from './controllers/pullscontroller';

export default class App {
    async render () {
        try {
            const pulls: any = await pullsController.list();

            this.setRoot(createPullsPage(pulls));
        }
        catch (err) {
            this.setRoot(createErrorPage());
        }
    }

    private setRoot (html: string) {
        document.getElementById('root').innerHTML = html;
    }
}
