export default function({ pullRequestList } : any) {
    console.log(pullRequestList);
    return pullRequestList
                .map(pullrequest =>
                    (`<p>
                        <a href="${pullrequest['html_url']}">
                            ${pullrequest['title']}
                        </a> by ${pullrequest['user']['login']}
                    </p>`))
                .join('');
    
}