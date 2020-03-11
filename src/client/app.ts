import M from 'materialize-css';
import debugFactory from '../shared/debugFactory';
import PullRequestsComponent from './components/pullRequests';
import HeaderComponent from './components/header';
import ModalComponent from './components/modal';
import ReposComponent from './components/repos';
import config from '../shared/sharedConfig';
import PullsController from './controllers/pullsController';
import { PullRequestInfo } from '../shared/interfaces/ownerRepo';

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
        const modal = document?.querySelector('GHC-Modal');

        if (header && repos && pullrequests && modal) {
            const pulls = document.querySelector('GHC-PullRequestList');

            header.addEventListener('reloadButtonClicked', async () => {
                debug.log('Reload pull requests button clicked');
                await (pulls as PullRequestsComponent).render();
            });

            modal.addEventListener('addCommentButtonClicked', async (e: Event) => {
                const commentMsg = (e as CustomEvent).detail.message;
                const pullRequests = Array.from((pullrequests as PullRequestsComponent).getCheckedPullRequests());

                if (pullRequests.length) {
                    const fn = (htmlURL: string): PullRequestInfo => {
                        const match = config.OWNER_REPO_REGEX.exec(htmlURL)?.groups;

                        if (match) {
                            return {
                                owner:          match.owner || config.DEFAULT_OWNER,
                                repo:           match.repo || config.DEFAULT_REPO,
                                'issue_number': parseInt(match.number, 10) || config.DEFAULT_ISSUE_NUMBER
                            };
                        }
                        throw new Error('Invalid regular expression: failed to parse PR URL');
                    };

                    await PullsController.addComment(pullRequests.map(fn), commentMsg);

                    M.toast({ html: `Your comment was added to ${pullRequests.length} pull requests` });
                }
                else
                    M.toast({ html: 'Select some pull requests first' });

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
