document.addEventListener('DOMContentLoaded', renderPage);

const pullRequestsDiv = document.querySelector('.pull-requests');

async function renderPage () {
    try {
        const response = await fetch('api/v1/pulls/');
        const { pullRequestList } = await response.json();

        pullRequestList.forEach(pr => createNewPullRequestDiv(pr));
    }
    catch (err) {
        const errorMessage = document.createElement('div');
        errorMessage.innerHTML = 'An error has occured while fetching data from server.';

        pullRequestsDiv.appendChild(errorMessage);
    }
}

function createNewPullRequestDiv (pullRequest) {
    const pullRequestDiv = document.createElement('div');

    pullRequestDiv.innerHTML = `<p><a href="${pullRequest['html_url']}">${pullRequest['title']}</a> by ${pullRequest['user']['login']}</p>`;
    pullRequestsDiv.appendChild(pullRequestDiv);
}
