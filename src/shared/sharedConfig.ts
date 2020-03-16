export default {
    // NOTE:
    // time in ms
    POLLING_INTERVAL:     5000,
    // NOTE:
    // For parsing URL like
    // github.com/owner/repo/pulls/number
    OWNER_REPO_REGEX:     /\/(?<owner>[\w,\-,_]+)\/(?<repo>[\w,\-,_]+)\/pull\/(?<number>[0-9]+)/,
    DEFAULT_OWNER:        'wentwrong',
    DEFAULT_REPO:         'gh-canary',
    DEFAULT_ISSUE_NUMBER: 1,
    TEMPLATES_DIR:        'templates',
    TEMPLATES_EXT:        'mustache'
};
