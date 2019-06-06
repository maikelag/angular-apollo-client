import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';
import { NewsGraphqlService } from '../graphql-services/news.graphql.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as newsActions from '../state/news.actions';
import { VoteNews } from '../models/vote-news.model';
import { SnackbarOpen } from '../../shared/state/snack-bar.actions';
import { AddError } from '../../shared/state/error.actions';

@Injectable()
export class NewsEffect {
  constructor(
    private actions$: Actions,
    private newsService: NewsService,
    private newsGraphqlService: NewsGraphqlService,
    private translate: TranslateService
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
    ),
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

  @Effect()
  voteNews$: Observable<Action> = this.actions$.pipe(
    ofType<newsActions.VoteNews>(
      newsActions.NewsActionTypes.VOTE_NEWS
    ),
    map((action: newsActions.VoteNews) => action.payload),
    mergeMap((vote: {vote: string, idNews: number}) =>
      this.newsService.voteNews(vote.vote, vote.idNews).pipe(
        map(
          (voteNews: News) => new newsActions.VoteNewsSuccess(voteNews)
        ),
        catchError(err => of(new SnackbarOpen({
          message: this.translate.instant('error'),
          type: '',
          config: {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['snackbar-error']
          }
        })))
      )
    )
  );

  @Effect()
  voteNewsSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<newsActions.VoteNewsSuccess>(
      newsActions.NewsActionTypes.VOTE_NEWS_SUCCESS),
      map((voteNews) => {
        return new SnackbarOpen({
          message: this.translate.instant('news.list.voteSuccess'),
          type: '',
          config: {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000,
            panelClass: ['snackbar-success']
          }
        });
      })
    );
}
