import createPullsPage from './templates/pulls';
import createErrorPage from './templates/error';
import createSettingsPage from './templates/settings';
import pullsController from './controllers/pullscontroller';

enum Pages { 
    PULL_REQUESTS = '#pulls', 
    SETTINGS = '#settings', 
    ERROR = '#error' 
};

export default class App {
    public currentPage: Pages;
    public dom: Document;

    constructor () {
        this.currentPage = Pages.PULL_REQUESTS;
        window.onhashchange = () => { this.render() };
    }

    // TODO:
    // improve this ugly state machine
    async render () {
        switch(document.location.hash) {
            case '':
            case '#pulls':
                try {
                    const pulls: any = await pullsController.list();
                    this.setRoot(createPullsPage(pulls));
                }
                catch(err) {
                    this.currentPage = Pages.ERROR;
                }
                break;
            case '#settings':
                this.currentPage = Pages.SETTINGS;
                this.setRoot(createSettingsPage());
                break;
            case '#error':
                this.currentPage = Pages.ERROR;
                this.setRoot(createErrorPage());
                break;
            default:
                this.currentPage = Pages.ERROR;
                break;
        }
    }

    redirect() {
        window.location.href = window.location.origin + this.currentPage;
    }

    private setRoot(html: string) {
        document.getElementById('root').innerHTML = 
        (`
            <a href="${Pages.PULL_REQUESTS}">Pull Requests</a>
            <a href="${Pages.SETTINGS}">Settings</a>
            <br>
            ${html}
        `);
    }
}
