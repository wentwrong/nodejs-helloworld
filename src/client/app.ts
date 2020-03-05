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

        const loader = document?.getElementById('loader');

        if (loader)
            this.removeChild(loader);

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

        if (header && repos) {
            const pulls = document.querySelector('GHC-PullRequestList');

            header.addEventListener('reloadButtonClicked', async () => {
                debug.log('Reload pull requests button clicked');
                await (pulls as PullRequestsComponent).render();
            });

            setInterval(async () => await (pulls as PullRequestsComponent).render(), config.POLLING_INTERVAL);
        }
    }
}
