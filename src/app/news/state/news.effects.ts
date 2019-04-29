import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as newsActions from '../state/news.actions';

@Injectable()
export class NewsEffect {
  constructor(
    private actions$: Actions,
    private newsService: NewsService
  ) {}

  // Cargar todas las series
  @Effect()
  loadallNews$: Observable<Action> = this.actions$.pipe(
    ofType<newsActions.LoadNews>(
      newsActions.NewsActionTypes.LOAD_NEWS
    ),
    mergeMap((actions: newsActions.LoadNews) =>
      this.newsService.listAllNews().pipe(
        map(
          (news: News[]) => {
            return new newsActions.LoadNewsSuccess(news);
          }
        ),
        catchError(err => of(new newsActions.LoadNewsFail(err)))
      )
    )
  );

  @Effect()
  createNews$: Observable<Action> = this.actions$.pipe(
    ofType<newsActions.CreateNews>(
      newsActions.NewsActionTypes.CREATE_NEWS
    ),
    map((action: newsActions.CreateNews) => action.payload),
    mergeMap((news: News) =>
      this.newsService.createNews(news).pipe(
        map(
          (newNews: News) => new newsActions.CreateNewsSuccess(newNews)
        ),
        catchError(err => of(new newsActions.CreateNewsFail(err)))
      )
    )
  );

}
