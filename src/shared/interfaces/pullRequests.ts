export interface PullRequest {
    html_url: string;
    title: string;
    number: number;
    author_association: string;
    created_at: string;
    user: {
        login: string;
        html_url: string;
        avatar_url: string;
    };
    labels: [{
        name: string;
    }];

}

export interface PullRequestList {
    pullRequestList: PullRequest[];
}
