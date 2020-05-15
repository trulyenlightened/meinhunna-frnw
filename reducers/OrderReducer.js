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
