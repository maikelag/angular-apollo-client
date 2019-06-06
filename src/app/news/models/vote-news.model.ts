import { News } from './news.model';
import { User } from '../../auth/models/user.model';

export class VoteNews {
    vote: string;
    newsId: News;
    userId: User;
}
