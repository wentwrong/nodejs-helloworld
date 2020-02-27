import { PullRequestList } from '../shared/interfaces/pullRequests';
import moment from 'moment';
import dedent from 'dedent';

export function createLoader (): string {
    return dedent`
        <div class="center-align">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
                </div>
            </div>
        </div>`;
}

export function createPullsPage ({ pullRequestList }: PullRequestList): string {
    if (pullRequestList.length) {
        const pulls = pullRequestList
            .map(pullrequest =>
                dedent`
                    <li class="collection-item avatar">
                        <img src="${pullrequest.user.avatar_url}" class="circle">
                        <span class="title">
                            <a href="${pullrequest.html_url}">
                                ${pullrequest.title} #${pullrequest.number}
                            </a>
                            by 
                            <a href="${pullrequest.user.html_url}">
                                ${pullrequest.user.login}
                            </a>
                        </span>
                        <div class="chip secondary-content">
                            ${moment(pullrequest.created_at).startOf('day').fromNow().toString()}
                        </div>
                    </li>
                `)
            .join('');

        return dedent`
            <ul class="collection">
                ${pulls}
            </ul>
            <div class="center-align">
                Fetched ${pullRequestList.length} non-collaborator Pull Requests
            </div>
            `;
    }
    return dedent`
        <div class="card-panel red lighten-2">
            <h1>
                0 non-collaborator Pull Requests.
            </h1>
        </div>
        `;
}
