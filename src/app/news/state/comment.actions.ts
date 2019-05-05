import { Comment } from '../models/comment.model';
import { Action } from '@ngrx/store';

export enum CommentsActionTypes {
  LOAD_COMMENTS = '[Comment] Load Comments',
  LOAD_COMMENTS_SUCCESS = '[Comment] Load Comments Success',

  CREATE_COMMENT = '[Comment] Create Commment',
  CREATE_COMMENT_SUCCESS = '[Comment] Create Commment Success',

  DELETE_COMMENT = '[Comment] Delete Commment',
  DELETE_COMMENT_SUCCESS = '[Comment] Delete Commment Success',

  VOTE_COMMENT = '[Comment] Vote Comment',
  VOTE_COMMENT_SUCCESS = '[Comment] Vote Comment Success'
}

export class LoadComments implements Action {
  readonly type = CommentsActionTypes.LOAD_COMMENTS;
  constructor(public payload: number) {}
}

export class LoadCommentsSuccess implements Action {
  readonly type = CommentsActionTypes.LOAD_COMMENTS_SUCCESS;
  constructor(public payload: Comment[]) {}
}

export class CreateComment implements Action {
  readonly type = CommentsActionTypes.CREATE_COMMENT;

  constructor(public payload: Comment) {}
}

export class CreateCommentSuccess implements Action {
  readonly type = CommentsActionTypes.CREATE_COMMENT_SUCCESS;
  constructor(public payload: Comment) {}
}

export class DeleteComment implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT;

  constructor(public payload: number) {}
}

export class DeleteCommentSuccess implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT_SUCCESS;
  constructor(public payload: number) {}
}

export class VoteComment implements Action {
  readonly type = CommentsActionTypes.VOTE_COMMENT;
  constructor(public payload: string) {}
}

export class VoteCommentSuccess implements Action {
  readonly type = CommentsActionTypes.VOTE_COMMENT_SUCCESS;
  constructor(public payload: string) {}
}

export type Action =
  | LoadComments
  | LoadCommentsSuccess
  | CreateComment
  | CreateCommentSuccess
  | DeleteComment
  | DeleteCommentSuccess
  | VoteComment
  | VoteCommentSuccess;
