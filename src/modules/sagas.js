import { fork, all } from 'redux-saga/effects';

import {
  handleAuthorizeAccount,
  handleCreateSession
} from './auth/saga';

import {
  handleSearchMovies
} from './search/saga';

export default function* rootSaga() {
  yield all([
    // Authorize
    fork(handleAuthorizeAccount),
    fork(handleCreateSession),
    // Search
    fork(handleSearchMovies),
  ]);
}
