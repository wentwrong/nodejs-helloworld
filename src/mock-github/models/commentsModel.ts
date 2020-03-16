import { Comment } from '../../shared/interfaces/comment';

class CommentsModel {
    private comments: Comment[];

    constructor () {
        this.comments = [];
    }

    getComments (): Comment[] {
        return this.comments;
    }

    addComment (comment: Comment): void {
        this.comments.push(comment);
    }
}

export default new CommentsModel();
