import debugFactory from '../shared/debugFactory';
import PullRequestsComponent from './components/pullRequests';
import HeaderComponent from './components/header';
import ModalComponent from './components/modal';
import ReposComponent from './components/repos';
import config from '../shared/sharedConfig';

const debug = debugFactory('app');

export default class GHCApp extends HTMLElement {
    constructor () {
        super();

        this.defineCustomElements();
        this.setEventHandlers();
    }

    defineCustomElements (): void {
        window.customElements.define('ghc-header', HeaderComponent);
        window.customElements.define('ghc-repos', ReposComponent);
        window.customElements.define('ghc-pullrequestlist', PullRequestsComponent);
        window.customElements.define('ghc-modal', ModalComponent);
    }

    setEventHandlers (): void {
        const header = document?.querySelector('GHC-Header');
        const repos = document?.querySelector('GHC-Repos');
        const pullrequests = document?.querySelector('GHC-PullRequestList');

        if (header && repos && pullrequests) {
            const pulls = document.querySelector('GHC-PullRequestList');

            header.addEventListener('reloadButtonClicked', async () => {
                debug.log('Reload pull requests button clicked');
                await (pulls as PullRequestsComponent).render();
            });

            pullrequests.addEventListener('pullRequestsLoaded', async () => {
                const loader = document?.getElementById('page-loader');

                if (loader)
                    this.removeChild(loader);
            });

            setInterval(async () => await (pulls as PullRequestsComponent).render(), config.POLLING_INTERVAL);
        }
        else
            throw new Error('Error occured while web components loading');
    }
}
