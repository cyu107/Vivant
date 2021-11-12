import { call, take, put } from 'redux-saga/effects';

// services
import { MovieDBService } from '../../services';

// actions
import { authActions, AUTHORIZE_ACCOUNT, CREATE_SESSION } from './actions';

// config
import config from '../../config';

export function* handleAuthorizeAccount() {
  while (true) {
    try {
      yield take(AUTHORIZE_ACCOUNT.REQUEST);

      // get acccoun_id & session_id from local storage
      const accountId = window.localStorage.getItem('account_id');
      const sessionId = window.localStorage.getItem('session_id');

      if (accountId && sessionId) {
        yield put(authActions.authorizeAccount.success({ accountId, sessionId }));
      } else {
        const { request_token } = yield call(MovieDBService.getAuthToken);
        if (request_token) {
          // ask for user permission
          window.location.replace(`${config.movieDB.authURL}/${request_token}?redirect_to=${config.movieDB.redirectURL}`);
        } else {
          yield put(authActions.authorizeAccount.failure({ message: 'Failed to get request token!' }));
        }
      }
    } catch (error) {
      yield put(authActions.authorizeAccount.failure(error));
    }
  }
}

export function* handleCreateSession() {
  while (true) {
    try {
      const { payload } = yield take(CREATE_SESSION.REQUEST);

      // create sessionId
      const { session_id } = yield call(MovieDBService.createSession, payload);
      window.localStorage.setItem('session_id', session_id);

      // get accountId
      const { id: account_id } = yield call(MovieDBService.getAccountDetails, session_id);
      window.localStorage.setItem('account_id', account_id);

      yield put(authActions.createSession.success({ sessionId: session_id, accountId: account_id }));
    } catch (error) {
      yield put(authActions.createSession.failure(error));
    }
  }
}
