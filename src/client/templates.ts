export function createErrorPage () {
    return '<b>OOOPS! ERROR OCCURED!</b>';
}

export function createPullsPage ({ pullRequestList }: any) {
    return pullRequestList
        .map(pullrequest =>
            `<p>
                <a href="${pullrequest['html_url']}">
                    ${pullrequest['title']}
                </a> by ${pullrequest['user']['login']}
            </p>`)
        .join('');
}
