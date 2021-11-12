import { defaultVisualState, setVisualState } from '../common';
import { AUTHORIZE_ACCOUNT, CREATE_SESSION } from './actions';

const initialState = {
  [AUTHORIZE_ACCOUNT]: defaultVisualState,
  [CREATE_SESSION]: defaultVisualState,
  accountId: null,
  sessionId: null
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_SESSION.REQUEST:
      return {
        ...state,
        ...setVisualState(state, CREATE_SESSION, true)
      };
    case CREATE_SESSION.SUCCESS:
      return {
        ...state,
        ...setVisualState(state, CREATE_SESSION, false),
        accountId: payload.accountId,
        sessionId: payload.sessionId
      };
    case CREATE_SESSION.FAILURE:
      return {
        ...state,
        ...setVisualState(state, CREATE_SESSION, false, payload.message)
      };
    case AUTHORIZE_ACCOUNT.REQUEST:
      return {
        ...state,
        ...setVisualState(state, AUTHORIZE_ACCOUNT, true)
      };
    case AUTHORIZE_ACCOUNT.SUCCESS:
      return {
        ...state,
        ...setVisualState(state, AUTHORIZE_ACCOUNT, false),
        accountId: payload.accountId,
        sessionId: payload.sessionId
      };
    case AUTHORIZE_ACCOUNT.FAILURE:
      return {
        ...state,
        ...setVisualState(state, AUTHORIZE_ACCOUNT, false, payload.message)
      };
    default:
    return state;
  }
};

export default authReducer;
