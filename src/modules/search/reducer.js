import { defaultVisualState, setVisualState } from '../common';
import { SEARCH_MOVIES } from './actions';

const initialState = {
  [SEARCH_MOVIES]: defaultVisualState,
  keyword: '',
  results: null
};

const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SEARCH_MOVIES.REQUEST:
      return {
        ...state,
        ...setVisualState(state, SEARCH_MOVIES, true),
        keyword: payload
      };
    case SEARCH_MOVIES.SUCCESS:
      return {
        ...state,
        ...setVisualState(state, SEARCH_MOVIES, false),
        results: {
          movies: payload.results,
          totalPages: payload.total_pages,
          totalResults: payload.total_results,
        }
      };
    case SEARCH_MOVIES.FAILURE:
      return {
        ...state,
        ...setVisualState(state, SEARCH_MOVIES, false, payload.message),
        movies: {}
      };
    default:
    return state;
  }
};

export default searchReducer;
