import { TvShowState } from './tv-show.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as tvShowActions from './tv-show.actions';
import { TvShow } from '../models/tv-show';
import * as fromRoot from '../../state/app-state';

export interface TvShowState extends EntityState<TvShow> {
  selectedTvShowId: string | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  tvShows: TvShowState;
}

export const tvShowAdapter: EntityAdapter<TvShow> = createEntityAdapter<TvShow>({
  selectId: tvShow => tvShow.id
});

export const defaultTvShow: TvShowState = {
  ids: [],
  entities: {},
  selectedTvShowId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = tvShowAdapter.getInitialState(defaultTvShow);

export function tvShowReducer(state = initialState, action: tvShowActions.Action): TvShowState {
  switch (action.type) {
    // Casos para cargar todas las series
    case tvShowActions.TvShowActionTypes.LOAD_TVSHOWS: {
      return {
        ...state,
        loading: true
      };
    }
    case tvShowActions.TvShowActionTypes.LOAD_TVSHOWS_SUCCESS: {
      return tvShowAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case tvShowActions.TvShowActionTypes.LOAD_TVSHOWS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // Casos para cargar una serie
    case tvShowActions.TvShowActionTypes.LOAD_TVSHOW: {
      return {
        ...state,
        loading: true
      };
    }
    case tvShowActions.TvShowActionTypes.LOAD_TVSHOW_SUCCESS: {
      return tvShowAdapter.addOne(action.payload, {
        ...state,
        selectedTvShowId: action.payload.id
      });
    }
    case tvShowActions.TvShowActionTypes.LOAD_TVSHOW_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    // Casos para crear una nueva serie
    case tvShowActions.TvShowActionTypes.CREATE_TVSHOW_SUCCESS: {
      return tvShowAdapter.addOne(action.payload, state);
    }
    case tvShowActions.TvShowActionTypes.CREATE_TVSHOW_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    // Casos para actualizar una serie
    case tvShowActions.TvShowActionTypes.UPDATE_TVSHOW_SUCCESS: {
      return tvShowAdapter.updateOne(action.payload, state);
    }
    case tvShowActions.TvShowActionTypes.UPDATE_TVSHOW_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    // Casos para eliminar una serie
    case tvShowActions.TvShowActionTypes.DELETE_TVSHOW_SUCCESS: {
      return tvShowAdapter.removeOne(action.payload, state);
    }
    case tvShowActions.TvShowActionTypes.DELETE_TVSHOW_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const getTvShowFeatureState = createFeatureSelector<TvShowState>(
  'tvShows'
);

export const getTvShows = createSelector(
  getTvShowFeatureState,
  tvShowAdapter.getSelectors().selectAll
);

export const getTvShowsLoading = createSelector(
  getTvShowFeatureState,
  (state: TvShowState) => state.loading
);

export const getTvShowsLoaded = createSelector(
  getTvShowFeatureState,
  (state: TvShowState) => state.loaded
);

export const getError = createSelector(
  getTvShowFeatureState,
  (state: TvShowState) => state.error
);

export const getCurrentTvShowId = createSelector(
  getTvShowFeatureState,
  (state: TvShowState) => state.selectedTvShowId
);

export const getCurrentTvShow = createSelector(
  getTvShowFeatureState,
  getCurrentTvShowId,
  state => state.entities[state.selectedTvShowId]
);
