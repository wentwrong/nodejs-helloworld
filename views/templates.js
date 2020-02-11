// NOTE: it's awful tmp solution
const dedent = require('dedent');

const pullRequestsPage = ({ pullRequestList, owner, repo }) => dedent `
        <html>
        <head><title>${owner}/${repo} pull requests</title></head>
        <body>
            ${owner}/${repo} has ${ pullRequestList.length } non-collaborator pull requests.
            <ul>
                ${pullRequestList.map(pr => `<li><a href="${pr.html_url}">${pr.title}</a> by ${pr.user.login}</li>`).join('\n')}       
            </ul>
        </body>
        </html>`;

module.exports = pullRequestsPage;
