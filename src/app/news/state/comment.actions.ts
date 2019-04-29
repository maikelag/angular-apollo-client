import { Comment } from '../models/comment.model';
import { Action } from '@ngrx/store';

export enum CommentsActionTypes {
  LOAD_COMMENTS = '[Comment] Load Comments',
  LOAD_COMMENTS_SUCCESS = '[Comment] Load Comments Success',
  LOAD_COMMENTS_FAIL = '[Comment] Load Comments Fail',

  CREATE_COMMENT = '[Comment] Create Commment',
  CREATE_COMMENT_SUCCESS = '[Comment] Create Commment Success',
  CREATE_COMMENT_FAIL = '[Comment] Create Commment Fail',

  DELETE_COMMENT = '[Comment] Delete Commment',
  DELETE_COMMENT_SUCCESS = '[Comment] Delete Commment Success',
  DELETE_COMMENT_FAIL = '[Comment] Delete Commment Fail',

  VOTE_COMMENT = '[Comment] Vote Comment',
  VOTE_COMMENT_SUCCESS = '[Comment] Vote Comment Success',
  VOTE_COMMENT_FAIL = '[Comment] Vote Comment Fail'
}

export class LoadComments implements Action {
  readonly type = CommentsActionTypes.LOAD_COMMENTS;
}

export class LoadCommentsSuccess implements Action {
  readonly type = CommentsActionTypes.LOAD_COMMENTS_SUCCESS;
  constructor(public payload: Comment[]) {}
}

export class LoadCommentsFail implements Action {
  readonly type = CommentsActionTypes.LOAD_COMMENTS_FAIL;
  constructor(public payload: string) {}
}

export class CreateComment implements Action {
  readonly type = CommentsActionTypes.CREATE_COMMENT;

  constructor(public payload: Comment) {}
}

export class CreateCommentSuccess implements Action {
  readonly type = CommentsActionTypes.CREATE_COMMENT_SUCCESS;
  constructor(public payload: Comment) {}
}

export class CreateCommentFail implements Action {
  readonly type = CommentsActionTypes.CREATE_COMMENT_FAIL;
  constructor(public payload: string) {}
}

export class DeleteComment implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT;

  constructor(public payload: number) {}
}

export class DeleteCommentSuccess implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteCommentFail implements Action {
  readonly type = CommentsActionTypes.DELETE_COMMENT_FAIL;
  constructor(public payload: string) {}
}

export class VoteComment implements Action {
  readonly type = CommentsActionTypes.VOTE_COMMENT;
  constructor(public payload: string) {}
}

export class VoteCommentSuccess implements Action {
  readonly type = CommentsActionTypes.VOTE_COMMENT_SUCCESS;
  constructor(public payload: string) {}
}

export class VoteCommentFail implements Action {
  readonly type = CommentsActionTypes.VOTE_COMMENT_FAIL;
  constructor(public payload: string) {}
}

export type Action =
  | LoadComments
  | LoadCommentsSuccess
  | LoadCommentsFail
  | CreateComment
  | CreateCommentSuccess
  | CreateCommentFail
  | DeleteComment
  | DeleteCommentSuccess
  | DeleteCommentFail
  | VoteComment
  | VoteCommentSuccess
  | VoteCommentFail;
