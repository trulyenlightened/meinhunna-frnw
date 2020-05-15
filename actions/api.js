import axios from 'axios';
import { getEnvironment } from '../utils';

export const REQUEST_SUCCESS = 'api/REQUEST_SUCCESS';
export const REQUEST_FAILURE = 'api/REQUEST_FAILURE';

import { apiUrl } from '../constants'

export function createApi(state) {
  const options = {};

  if (state) {
    const { token } = state.auth;
    if (token) {
      options.headers = {
        Authorization: `Bearer ${token}`,
        withCredentials: true,
      };
    }
  }

  return axios.create({ baseURL: apiUrl, ...options });
}

export const request = (type, params, key = 'REQUEST') => (
  dispatch,
  getState,
) => {
  const state = getState();
  const api = createApi(state);

  const requests = {
    get: api.get,
    post: api.post,
    put: api.put,
    delete: api.delete,
  };
  if (requests[type] === api.put) {
    let inDebounce;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => {
      requests[type](...params)
        .then((res) => {
          dispatch({
            type: `${key}_SUCCESS`,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: `${key}_FAILURE`,
            payload: err.response ? err.response.data.message : err.message,
          });
        });
    }, 400);
  } else {
    requests[type](...params)
      .then((res) => {
        dispatch({
          type: `${key}_SUCCESS`,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: `${key}_FAILURE`,
          payload: err.response ? err.response.data.message : err.message,
        });
      });
  }
};

export const requestDebounce = (type, params, key, timeout = 300) => {
  const action = request(type, params, key);
  action.meta = {
    debounce: { time: timeout, key },
  };
  return action;
};
