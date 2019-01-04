import { LoadTvShows, CreateTvShow } from './tv-show.actions';
import { TvShow } from '../models/tv-show';
import { TvShowService } from '../services/tv-show.service';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as tvShowActions from '../state/tv-show.actions';

@Injectable()
export class TvShowEffect {
  constructor(
    private actions$: Actions,
    private tvShowService: TvShowService
  ) {}

  // Cargar todas las series
  @Effect()
  loadTvShows$: Observable<Action> = this.actions$.pipe(
    ofType<tvShowActions.LoadTvShows>(
      tvShowActions.TvShowActionTypes.LOAD_TVSHOWS
    ),
    mergeMap((actions: tvShowActions.LoadTvShows) =>
      this.tvShowService.listAllTvShows().pipe(
        map(
          (tvShows: TvShow[]) => {
            return new tvShowActions.LoadTvShowsSuccess(tvShows);
          }
        ),
        catchError(err => of(new tvShowActions.LoadTvShowsFail(err)))
      )
    )
  );

  // Cargar una serie dado el id
  @Effect()
  loadTvShow$: Observable<Action> = this.actions$.pipe(
    ofType<tvShowActions.LoadTvShow>(
      tvShowActions.TvShowActionTypes.LOAD_TVSHOW
    ),
    mergeMap((action: tvShowActions.LoadTvShow) =>
      this.tvShowService.findOneTvShow(action.payload).pipe(
        map(
          (tvShow: TvShow) => new tvShowActions.LoadTvShowSuccess(tvShow)
        ),
        catchError(err => of(new tvShowActions.LoadTvShowFail(err)))
      )
    )
  );

  // Crear una nueva serie
  @Effect()
  createTvShow$: Observable<Action> = this.actions$.pipe(
    ofType<tvShowActions.CreateTvShow>(
      tvShowActions.TvShowActionTypes.CREATE_TVSHOW
    ),
    map((action: tvShowActions.CreateTvShow) => action.payload),
    mergeMap((tvShow: TvShow) =>
      this.tvShowService.createTvShow(tvShow).pipe(
        map(
          (newTvShow: TvShow) => new tvShowActions.CreateTvShowSuccess(newTvShow)
        ),
        catchError(err => of(new tvShowActions.CreateTvShowFail(err)))
      )
    )
  );

  // Actualizar una serie
  @Effect()
  updateTvShow$: Observable<Action> = this.actions$.pipe(
    ofType<tvShowActions.UpdateTvShow>(
      tvShowActions.TvShowActionTypes.UPDATE_TVSHOW
    ),
    map((action: tvShowActions.UpdateTvShow) => action.payload),
    mergeMap((tvShow: TvShow) =>
      this.tvShowService.updateTvShow(tvShow._id, tvShow).pipe(
        map(
          (updatedTvShow: TvShow) => new tvShowActions.UpdateTvShowSuccess({
            id: updatedTvShow._id,
            changes: updatedTvShow
          })
        ),
        catchError(err => of(new tvShowActions.UpdateTvShowFail(err)))
      )
    )
  );

  // Eliminar una serie
  @Effect()
  deleteTvShow$: Observable<Action> = this.actions$.pipe(
    ofType<tvShowActions.DeleteTvShow>(
      tvShowActions.TvShowActionTypes.DELETE_TVSHOW
    ),
    map((action: tvShowActions.DeleteTvShow) => action.payload),
    mergeMap((idTvShow: string) =>
      this.tvShowService.deleteTvShow(idTvShow).pipe(
        map(() => new tvShowActions.DeleteTvShowSuccess(idTvShow)),
        catchError(err => of(new tvShowActions.DeleteTvShowFail(err)))
      )
    )
  );

}
