import { Action } from '@ngrx/store';
import { Comment } from '../models/comment.model';

export enum CommentActionTypes {
  LOAD_COMMENTS = '[Comment] Load Comments',
  LOAD_COMMENTS_SUCCESS = '[Comment] Load Comments Success',

  CREATE_COMMENT = '[Comment] Create Comment',
  CREATE_COMMENT_SUCCESS = '[Comment] Create Comment Success',

  DELETE_COMMENT = '[Comment] Delete Comment',
  DELETE_COMMENT_SUCCESS = '[Comment] Delete Comment Success',

  VOTE_COMMENT = '[Comment] Vote Comment',
  VOTE_COMMENT_SUCCESS = '[Comment] Vote Comment Success'
}

export class LoadComments implements Action {
  readonly type = CommentActionTypes.LOAD_COMMENTS;
  constructor(public payload: number) {}
}

export class LoadCommentsSuccess implements Action {
  readonly type = CommentActionTypes.LOAD_COMMENTS_SUCCESS;
  constructor(public payload: Comment[]) {}
}

export class CreateComment implements Action {
  readonly type = CommentActionTypes.CREATE_COMMENT;
  constructor(public payload: {comment: Comment, idNews: number}) {}
}

export class CreateCommentSuccess implements Action {
  readonly type = CommentActionTypes.CREATE_COMMENT_SUCCESS;
  constructor(public payload: Comment) {}
}

export class DeleteComment implements Action {
  readonly type = CommentActionTypes.DELETE_COMMENT;
  constructor(public id: number) {}
}

export class DeleteCommentSuccess implements Action {
  readonly type = CommentActionTypes.DELETE_COMMENT_SUCCESS;
  constructor(public payload: Comment) {}
}

export class VoteComment implements Action {
  readonly type = CommentActionTypes.VOTE_COMMENT;
  constructor(public payload: any) {}
}

export class VoteCommentSuccess implements Action {
  readonly type = CommentActionTypes.VOTE_COMMENT_SUCCESS;
  constructor(public payload: any) {}
}

export type Actions =
  | LoadComments
  | LoadCommentsSuccess
  | CreateComment
  | CreateCommentSuccess
  | DeleteComment
  | DeleteCommentSuccess
  | VoteComment
  | VoteCommentSuccess;
