import { PullRequestList } from '../shared/interfaces/pullRequests';

export function createErrorPage (): string {
    return '<b>OOOPS! ERROR OCCURED!</b>';
}

export function createPullsPage ({ pullRequestList }: PullRequestList): string {
    return pullRequestList
        .map(pullrequest =>
            `<p>
                <a href="${pullrequest['html_url']}">
                    ${pullrequest['title']}
                </a> by ${pullrequest['user']['login']}
            </p>`)
        .join('');
}
