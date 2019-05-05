import { News } from './news.model';
import { VoteComment } from './vote-comment';
import { User } from '../../auth/models/user.model';

export class Comment {
  id: number;
  comment: string;
  createdAt: Date;
  news: News;
  author: User;
  voteComment: VoteComment | any;
  fatherComment: Comment | number;

  constructor() {}

  get votePositive(): number {
    return 2;
  }

  get voteNegative(): number {
    return 2;
  }
}
