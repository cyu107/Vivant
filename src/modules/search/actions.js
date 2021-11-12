import { createRequestTypes } from '../common';

export const SEARCH_MOVIES = createRequestTypes('SEARCH_MOVIES');

export const searchActions = {
  searchMovies: {
    request: keyword => ({ type: SEARCH_MOVIES.REQUEST, payload: keyword }),
    success: response => ({ type: SEARCH_MOVIES.SUCCESS, payload: response }),
    failure: error => ({ type: SEARCH_MOVIES.FAILURE, payload: error })
  }
};
