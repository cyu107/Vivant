export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const defaultVisualState = {
  loading: false,
  errorMessage: ''
};

export const setVisualState = (state, code, loading, errorMessage = '') => {
  return { [code]: { ...state[code], loading, errorMessage } };
};

export const createRequestTypes = (base) => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    return { ...acc, [type]: `${base}_${type}` };
  }, {});
};
