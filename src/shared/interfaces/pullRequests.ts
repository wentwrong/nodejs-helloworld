export interface PullRequest {
    html_url: string;
    title: string;
    author_association: string;
    user: {
        login: string;
    };
}

export interface PullRequestList {
    pullRequestList: PullRequest[];
}
