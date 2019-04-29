import { Comment } from './comment.model';
import { User } from '../../auth/models/user.model';

export class VoteComment {
  vote: string;
  commentId: Comment;
  userId: User;
}
