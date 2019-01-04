import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { TvShow } from '../models/tv-show';

export enum TvShowActionTypes {
  LOAD_TVSHOWS = '[TvShow] Load TvShows',
  LOAD_TVSHOWS_SUCCESS = '[TvShow] Load TvShows Success',
  LOAD_TVSHOWS_FAIL = '[TvShow] Load TvShows Fail',

  LOAD_TVSHOW = '[TvShow] Load TvShow',
  LOAD_TVSHOW_SUCCESS = '[TvShow] Load TvShow Success',
  LOAD_TVSHOW_FAIL = '[TvShow] Load TvShow Fail',

  CREATE_TVSHOW = '[TvShow] Create TvShow',
  CREATE_TVSHOW_SUCCESS = '[TvShow] Create TvShow Success',
  CREATE_TVSHOW_FAIL = '[TvShow] Create TvShow Fail',

  UPDATE_TVSHOW = '[TvShow] Update TvShow',
  UPDATE_TVSHOW_SUCCESS = '[TvShow] Update TvShow Success',
  UPDATE_TVSHOW_FAIL = '[TvShow] Update TvShow Fail',

  DELETE_TVSHOW = '[TvShow] Delete TvShow',
  DELETE_TVSHOW_SUCCESS = '[TvShow] Delete TvShow Success',
  DELETE_TVSHOW_FAIL = '[TvShow] Delete TvShow Fail'
}

// Cargando todas las serie
export class LoadTvShows implements Action {
  readonly type = TvShowActionTypes.LOAD_TVSHOWS;
}

export class LoadTvShowsSuccess implements Action {
  readonly type = TvShowActionTypes.LOAD_TVSHOWS_SUCCESS;

  constructor(public payload: TvShow[]) {}
}

export class LoadTvShowsFail implements Action {
  readonly type = TvShowActionTypes.LOAD_TVSHOWS_FAIL;

  constructor(public payload: string) {}
}

// Cargando una serie por _id
export class LoadTvShow implements Action {
  readonly type = TvShowActionTypes.LOAD_TVSHOW;

  constructor(public payload: string) {}
}

export class LoadTvShowSuccess implements Action {
  readonly type = TvShowActionTypes.LOAD_TVSHOW_SUCCESS;

  constructor(public payload: TvShow) {}
}

export class LoadTvShowFail implements Action {
  readonly type = TvShowActionTypes.LOAD_TVSHOW_FAIL;

  constructor(public payload: string) {}
}

// Creando una serie
export class CreateTvShow implements Action {
  readonly type = TvShowActionTypes.CREATE_TVSHOW;

  constructor(public payload: TvShow) {}
}

export class CreateTvShowSuccess implements Action {
  readonly type = TvShowActionTypes.CREATE_TVSHOW_SUCCESS;

  constructor(public payload: TvShow) {}
}

export class CreateTvShowFail implements Action {
  readonly type = TvShowActionTypes.CREATE_TVSHOW_FAIL;

  constructor(public payload: string) {}
}

// Actualizando una serie dado el id
export class UpdateTvShow implements Action {
  readonly type = TvShowActionTypes.UPDATE_TVSHOW;

  constructor(public payload: TvShow) {}
}

export class UpdateTvShowSuccess implements Action {
  readonly type = TvShowActionTypes.UPDATE_TVSHOW_SUCCESS;

  constructor(public payload: Update<TvShow>) {}
}

export class UpdateTvShowFail implements Action {
  readonly type = TvShowActionTypes.UPDATE_TVSHOW_FAIL;

  constructor(public payload: string) {}
}

// Eliminando una serie
export class DeleteTvShow implements Action {
  readonly type = TvShowActionTypes.DELETE_TVSHOW;

  constructor(public payload: string) {}
}

export class DeleteTvShowSuccess implements Action {
  readonly type = TvShowActionTypes.DELETE_TVSHOW_SUCCESS;

  constructor(public payload: string) {}
}

export class DeleteTvShowFail implements Action {
  readonly type = TvShowActionTypes.DELETE_TVSHOW_FAIL;

  constructor(public payload: string) {}
}

export type Action =
  | LoadTvShows
  | LoadTvShowsSuccess
  | LoadTvShowsFail
  | LoadTvShow
  | LoadTvShowSuccess
  | LoadTvShowFail
  | CreateTvShow
  | CreateTvShowSuccess
  | CreateTvShowFail
  | UpdateTvShow
  | UpdateTvShowSuccess
  | UpdateTvShowFail
  | DeleteTvShow
  | DeleteTvShowSuccess
  | DeleteTvShowFail;
