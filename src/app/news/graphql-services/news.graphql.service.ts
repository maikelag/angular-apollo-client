import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { News } from '../models/news.model';
import { Apollo } from 'apollo-angular';
import * as newsQueries from '../../graphql/queries/news.query';
import { map } from 'rxjs/operators';

@Injectable()
export class NewsGraphqlService {
  constructor(private apollo: Apollo) {}

  listAllNews(): Observable<any> {
    return this.apollo.watchQuery({ query: newsQueries.getAllNews })
      .valueChanges.pipe(
        map(res => res.data
        )
      );
  }

  createNews(newstoCreate: News) {
    console.log('createNews', newstoCreate);
    return this.apollo.mutate({
      mutation: newsQueries.newsAdd,
      variables: {
        news: {
          title: newstoCreate.title,
          description: newstoCreate.description,
          source: newstoCreate.source,
        }
      },
    }).pipe(
      map(res => res.data
      )
    );;
  }
}
