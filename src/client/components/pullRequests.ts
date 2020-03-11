import moment from 'moment';
import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import loadTemplate from '../utils/loadTemplate';
import PullsController from '../controllers/pullsController';
import { PullRequest } from '../../shared/interfaces/pullRequests';

const debug = debugFactory('pull-requests-component');

type PullRequestWithSelection = PullRequest & { checked: boolean };

export default class PullRequestsComponent extends HTMLElement {
    private checkedPullRequests: Set<string>;

    constructor () {
        super();
        this.checkedPullRequests = new Set<string>();
    }

    async connectedCallback (): Promise<void> {
        await this.render();
    }

    getCheckedPullRequests (): Set<string> {
        return this.checkedPullRequests;
    }

    async render (): Promise<void> {
        try {
            this.showLoader();

            const { pullRequestList: pulls } = await PullsController.list();

            this.dispatchEvent(new CustomEvent('pullRequestsLoaded'));

            const pullRequestListTmpl = await loadTemplate('pullRequestList');
            const pullRequestTmpl = await loadTemplate('pullRequest');

            const pullsWithCheckedStatus = this.pullRequestsCheckedStatus(pulls);

            this.innerHTML = Mustache
                .render(pullRequestListTmpl,
                    {
                        pulls:               pullsWithCheckedStatus,
                        formatTimeFromToday: function (): string {
                            return moment(this.created_at)
                                .startOf('day')
                                .fromNow()
                                .toString();
                        }
                    }, { pull: pullRequestTmpl });
            this.setEventHandlers();
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }

    /**
     * Add `checked` property and remove unnecessary checked Pull Requests
     *
     * @param {PullRequest[]} pulls
     * @returns {PullRequestWithSelection[]}
     * @memberof PullRequestsComponent
     */
    pullRequestsCheckedStatus (pulls: PullRequest[]): PullRequestWithSelection[] {
        const newCheckedPullRequests = new Set<string>();

        const fn = (pullRequest: PullRequest): PullRequestWithSelection => {
            if (this.checkedPullRequests.has(pullRequest.html_url))
                newCheckedPullRequests.add(pullRequest.html_url);

            return {
                ...pullRequest,
                checked: this.checkedPullRequests.has(pullRequest.html_url)
            };
        };

        const pullsWithCheckedStatus = pulls.map(fn);

        this.checkedPullRequests = newCheckedPullRequests;

        return pullsWithCheckedStatus;
    }

    showLoader (): void {
        const loader = this.querySelector('#pullrequests-loader') as HTMLDivElement | null;
        const wrapper = this.querySelector('#pullrequests-load-wrapper') as HTMLDivElement | null;

        if (wrapper)
            wrapper.hidden = false;

        if (loader)
            loader.hidden = false;
    }

    setEventHandlers (): void {
        const checkboxes = this.querySelectorAll('.pullrequest-checkbox');

        checkboxes
            .forEach(checkbox => checkbox
                .addEventListener('click', e => {
                    const pullRequestURL = (e.target as HTMLInputElement).value;
                    const isCheckboxChecked = (e.target as HTMLInputElement).checked;

                    if (isCheckboxChecked)
                        this.checkedPullRequests.add(pullRequestURL);
                    else
                        this.checkedPullRequests.delete(pullRequestURL);
                })
            );
    }
}
