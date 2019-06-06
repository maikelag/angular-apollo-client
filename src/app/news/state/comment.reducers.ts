

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as commentActions from './comment.actions';
import { Comment } from '../models/comment.model';
import * as fromRoot from '../../state/app-state';

export interface CommentState extends EntityState<Comment> {
  selectedCommentId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  comments: CommentState;
}

export const commentAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: comment => comment.id
});

export const defaultComment: CommentState = {
  ids: [],
  entities: {},
  selectedCommentId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = commentAdapter.getInitialState(defaultComment);


export function commentReducer(
    state = initialState,
    action: commentActions.Actions
  ): CommentState {
    switch (action.type) {
      // Casos para cargar todas las series
      case commentActions.CommentActionTypes.LOAD_COMMENTS: {
        return {
          ...state,
          loading: true
        };
      }
      case commentActions.CommentActionTypes.LOAD_COMMENTS_SUCCESS: {
        return commentAdapter.addAll(action.payload, {
          ...state,
          loading: false,
          loaded: true
        });
      }
      // Casos para crear una nueva serie
      case commentActions.CommentActionTypes.CREATE_COMMENT: {
        return {
          ...state,
          loading: true,
          loaded: false
        }
      }

      case commentActions.CommentActionTypes.CREATE_COMMENT_SUCCESS: {
        return commentAdapter.addOne(action.payload, state);
      }

      case commentActions.CommentActionTypes.VOTE_COMMENT: {
        return {
          ...state
        };
      }

      case commentActions.CommentActionTypes.VOTE_COMMENT_SUCCESS: {
        return commentAdapter.upsertOne(action.payload, state);
      }

      default: {
        return state;
      }
    }
  }

  
const getCommentFeatureState = createFeatureSelector<CommentState>('comment');

export const getComments = createSelector(
  getCommentFeatureState,
  commentAdapter.getSelectors().selectAll
);

export const getCommentLoading = createSelector(
  getCommentFeatureState,
  (state: CommentState) => state.loading
);

export const getCommentLoaded = createSelector(
  getCommentFeatureState,
  (state: CommentState) => state.loaded
);

export const getError = createSelector(
  getCommentFeatureState,
  (state: CommentState) => state.error
);

export const getCurrentCommentId = createSelector(
  getCommentFeatureState,
  (state: CommentState) => state.selectedCommentId
);

export const getCurrentComment = createSelector(
  getCommentFeatureState,
  getCurrentCommentId,
  state => state.entities[state.selectedCommentId]
);
