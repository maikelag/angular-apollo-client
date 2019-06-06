import { News } from '../models/news.model';
import { Action } from '@ngrx/store';

export enum NewsActionTypes {
  LOAD_NEWS = '[News] Load News',
  LOAD_NEWS_SUCCESS = '[News] Load News Success',
  LOAD_NEWS_FAIL = '[News] Load News Fail',

  LOAD_ONE_NEWS = '[News] Load one News',
  LOAD_ONE_NEWS_SUCCESS = '[News] Load one news Success',
  LOAD_ONE_NEWS_FAIL = '[News] Load one news Fail',

  CREATE_NEWS = '[News] Create News',
  CREATE_NEWS_SUCCESS = '[News] Create News Success',
  CREATE_NEWS_FAIL = '[News] Create News Fail',

  UPDATE_NEWS = '[News] Update News',
  UPDATE_NEWS_SUCCESS = '[News] Update News Success',
  UPDATE_NEWS_FAIL = '[News] Update News Fail',

  DELETE_NEWS = '[News] Delete News',
  DELETE_NEWS_SUCCESS = '[News] Delete News Success',
  DELETE_NEWS_FAIL = '[News] Delete News Fail',

  VOTE_NEWS = '[News] Vote News',
  VOTE_NEWS_SUCCESS = '[News] Vote News Success'
}

export class LoadNews implements Action {
  readonly type = NewsActionTypes.LOAD_NEWS;
}

export class LoadNewsSuccess implements Action {
  readonly type = NewsActionTypes.LOAD_NEWS_SUCCESS;
  constructor(public payload: News[]) {}
}

export class LoadNewsFail implements Action {
  readonly type = NewsActionTypes.LOAD_NEWS_FAIL;
  constructor(public payload: string) {}
}

export class LoadOneNews implements Action {
  readonly type = NewsActionTypes.LOAD_ONE_NEWS;

  constructor(public payload: number) {}
}

export class LoadOneNewsSuccess implements Action {
  readonly type = NewsActionTypes.LOAD_ONE_NEWS_SUCCESS;
  constructor(public payload: News) {}
}

export class LoadOneNewsFail implements Action {
  readonly type = NewsActionTypes.LOAD_ONE_NEWS_FAIL;
  constructor(public payload: string) {}
}

export class CreateNews implements Action {
  readonly type = NewsActionTypes.CREATE_NEWS;

  constructor(public payload: News) {}
}

export class CreateNewsSuccess implements Action {
  readonly type = NewsActionTypes.CREATE_NEWS_SUCCESS;
  constructor(public payload: News) {}
}

export class CreateNewsFail implements Action {
  readonly type = NewsActionTypes.CREATE_NEWS_FAIL;
  constructor(public payload: string) {}
}

export class DeleteNews implements Action {
  readonly type = NewsActionTypes.DELETE_NEWS;

  constructor(public payload: number) {}
}

export class DeleteNewsSuccess implements Action {
  readonly type = NewsActionTypes.DELETE_NEWS_SUCCESS;
  constructor(public payload: number) {}
}

export class DeleteNewsFail implements Action {
  readonly type = NewsActionTypes.DELETE_NEWS_FAIL;
  constructor(public payload: string) {}
}

export class VoteNews implements Action {
  readonly type = NewsActionTypes.VOTE_NEWS;
  constructor(public payload: {vote: string, idNews: number}) {}
}

export class VoteNewsSuccess implements Action {
  readonly type = NewsActionTypes.VOTE_NEWS_SUCCESS;
  constructor(public payload: News) {}
}

export type Action =
  | LoadNews
  | LoadNewsSuccess
  | LoadNewsFail
  | LoadOneNews
  | LoadOneNewsSuccess
  | LoadOneNewsFail
  | CreateNews
  | CreateNewsSuccess
  | CreateNewsFail
  | DeleteNews
  | DeleteNewsSuccess
  | DeleteNewsFail
  | VoteNews
  | VoteNewsSuccess;
