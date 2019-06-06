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
  voteNews: VoteNews[] | any;

  constructor() {}

  get votePositive(): number {
    return 587;
  }

  get voteNegative(): number {
    let total = 0;
    this.voteNews.forEach((element: VoteNews) => {
      if (element.vote === 'negativos') {
        total++;
      }
    });
    return total;
  }

  get createdDateFormat() {
    return '25 de diciembre';
  }

  aguacate() {
    return 'Aguacate verde';
  }
}
