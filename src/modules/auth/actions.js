import { createRequestTypes } from '../common';

export const AUTHORIZE_ACCOUNT = createRequestTypes('AUTHORIZE_ACCOUNT');
export const CREATE_SESSION = createRequestTypes('CREATE_SESSION');

export const authActions = {
  authorizeAccount: {
    request: () => ({ type: AUTHORIZE_ACCOUNT.REQUEST }),
    success: response => ({ type: AUTHORIZE_ACCOUNT.SUCCESS, payload: response }),
    failure: error => ({ type: AUTHORIZE_ACCOUNT.FAILURE, payload: error })
  },
  createSession: {
    request: token => ({ type: CREATE_SESSION.REQUEST, payload: token }),
    success: response => ({ type: CREATE_SESSION.SUCCESS, payload: response }),
    failure: error => ({ type: CREATE_SESSION.FAILURE, payload: error })
  }
};
