import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as newsActions from './news.actions';
import { News } from '../models/news.model';
import * as fromRoot from '../../state/app-state';

export interface NewsState extends EntityState<News> {
  selectedNewsId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  news: NewsState;
}

export const newsAdapter: EntityAdapter<News> = createEntityAdapter<News>({
  selectId: news => news.id
});

export const defaultNews: NewsState = {
  ids: [],
  entities: {},
  selectedNewsId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = newsAdapter.getInitialState(defaultNews);

export function newsReducer(
  state = initialState,
  action: newsActions.Action
): NewsState {
  switch (action.type) {
    // Casos para cargar todas las series
    case newsActions.NewsActionTypes.LOAD_NEWS: {
      return {
        ...state,
        loading: true
      };
    }
    case newsActions.NewsActionTypes.LOAD_NEWS_SUCCESS: {
      return newsAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }
    case newsActions.NewsActionTypes.LOAD_NEWS_FAIL: {
      return {
        ...state,
        entities: {},
        loading: false,
        loaded: false,
        error: action.payload
      };
    }

    // Casos para cargar una serie
    case newsActions.NewsActionTypes.LOAD_ONE_NEWS: {
      return {
        ...state,
        loading: true
      };
    }
    case newsActions.NewsActionTypes.LOAD_ONE_NEWS_SUCCESS: {
      return newsAdapter.addOne(action.payload, {
        ...state,
        selectedNewsId: action.payload.id
      });
    }
    case newsActions.NewsActionTypes.LOAD_ONE_NEWS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    // Casos para crear una nueva serie
    case newsActions.NewsActionTypes.CREATE_NEWS: {
      return newsAdapter.addOne(action.payload, state);
    }
    case newsActions.NewsActionTypes.CREATE_NEWS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    // Casos para eliminar una serie
    case newsActions.NewsActionTypes.DELETE_NEWS_SUCCESS: {
      return newsAdapter.removeOne(action.payload, state);
    }
    case newsActions.NewsActionTypes.DELETE_NEWS_FAIL: {
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

const getNewsFeatureState = createFeatureSelector<NewsState>('news');

export const getNews = createSelector(
  getNewsFeatureState,
  newsAdapter.getSelectors().selectAll
);

export const getNewsLoading = createSelector(
  getNewsFeatureState,
  (state: NewsState) => state.loading
);

export const getNewsLoaded = createSelector(
  getNewsFeatureState,
  (state: NewsState) => state.loaded
);

export const getError = createSelector(
  getNewsFeatureState,
  (state: NewsState) => state.error
);

export const getCurrentNewsId = createSelector(
  getNewsFeatureState,
  (state: NewsState) => state.selectedNewsId
);

export const getCurrentNews = createSelector(
  getNewsFeatureState,
  getCurrentNewsId,
  state => state.entities[state.selectedNewsId]
);
