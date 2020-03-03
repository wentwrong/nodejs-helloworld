import { Selector, t } from 'testcafe';

class IndexPage {
    constructor () {
        this.noPullRequestsDiv = Selector('#no-pull-requests');
        this.pullRequestDiv = Selector('#pull-request');
        this.reloadBtn = Selector('#reload-btn');
    }

    async clickReloadBtn () {
        await t
            .click(this.reloadBtn);
    }
}

export default new IndexPage();
