import {
  RETRIEVE_TOKEN_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
} from '../actions/auth';

const initialState = {
  email: '',
  password: '',
  confirmPassword: '',
  login: {
    submitted: false,
    touched: false,
  },
  token: '',
  loginInProgress: false,
  signupInProgress: false,
  responseMessage: '',
  loggedIn: false,
  socialToken: '',
};

export default (state = initialState, action) => {
  switch (action.type) {

    default:
      return state;
  }
};
