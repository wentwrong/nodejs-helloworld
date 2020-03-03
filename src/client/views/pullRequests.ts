import moment from 'moment';
import Mustache from 'mustache';
import { PullRequest, PullRequestList } from '../../shared/interfaces/pullRequests';
import debugFactory from '../../shared/debugFactory';
import View from './view';

const debug = debugFactory('pull-requests-view');

export default class PullRequestsView extends View {
    public pulls: PullRequest[];
    public slug: string;

    constructor ({ pullRequestList: pulls }: PullRequestList, slug: string) {
        super();
        this.pulls = pulls;
        this.slug = slug;
    }

    async render (): Promise<string> {
        try {
            const pullRequestListTmpl = await this.loadTemplate('pullRequestList');
            const pullRequestTmpl = await this.loadTemplate('pullRequest');

            return Mustache
                .render(pullRequestListTmpl,
                    {
                        slug:                this.slug,
                        pulls:               this.pulls,
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
