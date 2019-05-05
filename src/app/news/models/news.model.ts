import { Comment } from './comment.model';
import { VoteNews } from './vote-news.model';
import { User } from '../../auth/models/user.model';

export class News {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updateAt: Date;
  category: string;
  source: string;
  author: User;
  comments: Comment[] | number;
  voteNews: VoteNews[] | object;

  constructor() {}

  get votePositive(): number {
    return 2;
  }

  get voteNegative(): number {
    return 2;
  }

  get createdDateFormat() {
    return '25 de diciembre';
  }
}
