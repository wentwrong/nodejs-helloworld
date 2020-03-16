import { Selector, t } from 'testcafe';

class IndexPage {
    constructor () {
        this.noPullRequestsDiv = Selector('#no-pull-requests');
        this.pullRequestDiv = Selector('#pull-request');
        this.pullRequestCheckboxes = Selector('.pullrequest-checkbox');
        this.pullRequestSpanCheckboxes = Selector('.pullrequest-span-checkbox');
        this.reloadBtn = Selector('#reload-btn');
        this.commentBtn = Selector('#comment-btn');
        this.commentModalWindow = Selector('#modalComment');
        this.sentCommentBtn = Selector('#addCommentBtn');
        this.lastToast = Selector('.toast:last-child');
    }

    async clickSentComment () {
        await t
            .click(this.sentCommentBtn);
    }

    async clickReloadPullRequestsBtn () {
        await t
            .click(this.reloadBtn);
    }

    async clickShowModalWindowBtn () {
        await t
            .click(this.commentBtn);
    }
}

export default new IndexPage();
