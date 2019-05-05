import * as commentActions from './comment.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Comment } from '../models/comment.model';
import * as fromRoot from '../../state/app-state';

// import or declare state

export interface CommentState extends EntityState<Comment> {
  selectedCommentId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  comment: CommentState;
}

export const commentAdapter: EntityAdapter<Comment> = createEntityAdapter<
  Comment
>({
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
  action: commentActions.Action
): CommentState {
  switch (action.type) {
    case commentActions.CommentsActionTypes.LOAD_COMMENTS: {
      return { ...state, selectedCommentId: action.payload, loading: true, loaded: false };
    }

    case commentActions.CommentsActionTypes.LOAD_COMMENTS_SUCCESS: {
      return commentAdapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case commentActions.CommentsActionTypes.CREATE_COMMENT: {
      return commentAdapter.addOne(action.payload, state);
    }

    case commentActions.CommentsActionTypes.DELETE_COMMENT: {
      return commentAdapter.removeOne(action.payload, state);
    }

    case commentActions.CommentsActionTypes.DELETE_COMMENT_SUCCESS: {
      return commentAdapter.removeOne(action.payload, state);
    }

    case commentActions.CommentsActionTypes.VOTE_COMMENT: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case commentActions.CommentsActionTypes.VOTE_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    default:
      return state;
  }
}

const getCommentsFeatureState = createFeatureSelector<CommentState>('comments');

export const getComments = createSelector(
  getCommentsFeatureState,
  commentAdapter.getSelectors().selectAll
);

export const getCommentsLoading = createSelector(
  getCommentsFeatureState,
  (state: CommentState) => state.loading
);

export const getCommentsLoaded = createSelector(
  getCommentsFeatureState,
  (state: CommentState) => state.loaded
);

export const getError = createSelector(
  getCommentsFeatureState,
  (state: CommentState) => state.error
);

export const getCurrentCommentId = createSelector(
  getCommentsFeatureState,
  (state: CommentState) => state.selectedCommentId
);

export const getCurrentComment = createSelector(
  getCommentsFeatureState,
  getCurrentCommentId,
  state => state.entities[state.selectedCommentId]
);
