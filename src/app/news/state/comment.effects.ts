import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as commentActions from './comment.actions';
import { VoteComment } from '../models/vote-comment';
import { SnackbarOpen } from '../../shared/state/snack-bar.actions';
import { AddError } from '../../shared/state/error.actions';
import { NewsService } from '../services/news.service';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentEffect {
  constructor(
    private actions$: Actions,
    private newsService: NewsService,
    private translate: TranslateService
  ) {}

  @Effect()
  loadAllCommentOfNews$: Observable<Action> = this.actions$.pipe(
    ofType<commentActions.LoadComments>(
      commentActions.CommentActionTypes.LOAD_COMMENTS
    ),
    mergeMap((actions: commentActions.LoadComments) =>
      this.newsService.commentOfNews(actions.payload).pipe(
        map((comments: Comment[]) => {
          return new commentActions.LoadCommentsSuccess(comments);
        }),
        catchError(err =>
          of(
            new SnackbarOpen({
              message: this.translate.instant('error'),
              type: '',
              config: {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 2000,
                panelClass: ['snackbar-error']
              }
            })
          )
        )
      )
    )
  );

  @Effect()
  createComment$: Observable<Action> = this.actions$.pipe(
    ofType<commentActions.CreateComment>(
      commentActions.CommentActionTypes.CREATE_COMMENT
    ),
    map((action: commentActions.CreateComment) => action.payload),
    mergeMap((payload: any) =>
      this.newsService.commentNews(payload.comment, payload.idNews).pipe(
        map(
          (newComment: Comment) =>
            new commentActions.CreateCommentSuccess(newComment)
        ),
        catchError(err =>
          of(
            new SnackbarOpen({
              message: this.translate.instant('error'),
              type: '',
              config: {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 2000,
                panelClass: ['snackbar-error']
              }
            })
          )
        )
      )
    )
  );

  @Effect()
  voteComment$: Observable<Action> = this.actions$.pipe(
    ofType<commentActions.VoteComment>(
        commentActions.CommentActionTypes.VOTE_COMMENT
    ),
    map((action: commentActions.VoteComment) => action.payload),
    mergeMap((vote: {vote: string, idComment: number}) =>
      this.newsService.voteComment(vote.vote, vote.idComment).pipe(
        map(
          (voteComment: Comment) => new commentActions.VoteCommentSuccess(voteComment)
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
  voteCommentSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<commentActions.VoteCommentSuccess>(
        commentActions.CommentActionTypes.VOTE_COMMENT_SUCCESS),
      map((voteComment) => {
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
