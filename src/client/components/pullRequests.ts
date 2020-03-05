import moment from 'moment';
import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import loadTemplate from '../utils/loadTemplate';
import PullsController from '../controllers/pullsController';

const debug = debugFactory('pull-requests-component');

export default class PullRequestsComponent extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback (): Promise<void> {
        await this.render();
    }

    async render (): Promise<void> {
        try {
            const { pullRequestList: pulls } = await PullsController.list();

            const pullRequestListTmpl = await loadTemplate('pullRequestList');
            const pullRequestTmpl = await loadTemplate('pullRequest');

            this.innerHTML = Mustache
                .render(pullRequestListTmpl,
                    {
                        pulls,
                        formatTimeFromToday: function (): string {
                            return moment(this.created_at)
                                .startOf('day')
                                .fromNow()
                                .toString();
                        }
                    }, { pull: pullRequestTmpl });
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }
}
