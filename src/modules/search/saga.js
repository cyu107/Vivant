import { call, takeLatest, put } from 'redux-saga/effects';

// services
import { MovieDBService } from '../../services';

// actions
import { searchActions, SEARCH_MOVIES } from './actions';

function* searchMovies(action) {
  try {
    const { payload: keyword } = action;
    let searchedMovies = {};
    if (keyword.length > 1) {
      searchedMovies = yield call(MovieDBService.searchMovies, action.payload);
      yield put(searchActions.searchMovies.success(searchedMovies));
    } else {
      yield put(searchActions.searchMovies.failure({ message: 'Not enough length!' }));
    }
  } catch (error) {
    yield put(searchActions.searchMovies.failure(error));
  }
}

export function* handleSearchMovies() {
  yield takeLatest(SEARCH_MOVIES.REQUEST, searchMovies);
}
