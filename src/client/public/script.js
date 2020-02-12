class App {
    constructor() {
        this.pullRequestsDiv = document.querySelector('.pull-requests');
        this.renderPage();
    }

    async renderPage () {
        try {
            const response = await fetch('api/v1/pulls/');
            const { pullRequestList } = await response.json();
    
            pullRequestList.forEach(pr => this._createNewPullRequestDiv(pr));
        }
        catch (err) {
            console.log(err);
            const errorMessage = document.createElement('div');
            errorMessage.innerHTML = 'An error has occured while fetching data from server.';
    
            this.pullRequestsDiv.appendChild(errorMessage);
        }
    }

    _createNewPullRequestDiv (pullRequest) {
        const pullRequestDiv = document.createElement('div');
    
        pullRequestDiv.innerHTML = (`<p>
                                    <a href="${pullRequest['html_url']}">
                                    ${pullRequest['title']}
                                    </a> by ${pullRequest['user']['login']}</p>`);
       
        this.pullRequestsDiv.appendChild(pullRequestDiv);
    }    
}