import { PullRequestInfo } from '../../shared/interfaces/pullRequestInfo';

export interface Comment {
    pullRequest: PullRequestInfo;
    commentMsg: string;
}
