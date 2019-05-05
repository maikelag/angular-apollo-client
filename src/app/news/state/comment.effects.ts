import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { of, Observable } from "rxjs";
import { catchError, map, switchMap, mergeMap } from "rxjs/operators";

//import all requried services or any dependencies

import { Comment } from "../models/comment.model";
import { NewsService } from "../services/news.service";
import { Action } from "@ngrx/store";
import * as commentActions from "../state/comment.actions";

@Injectable()
export class CommentEffects {
  constructor(private actions$: Actions, private newsService: NewsService) {}

  @Effect()
  loadCommentsOfNews$: Observable<Action> = this.actions$.pipe(
    ofType<commentActions.LoadComments>(
      commentActions.CommentsActionTypes.LOAD_COMMENTS
    ),
    map((action: commentActions.LoadComments) => action.payload),
    mergeMap((newsId: number) =>
      this.newsService.commentOfNews(newsId).pipe(
        map((comments: Comment[]) => {
          return new commentActions.LoadCommentsSuccess(comments);
        })
      )
    )
  );
}
