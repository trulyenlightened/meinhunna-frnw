import {
  RETRIEVE_TOKEN_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_LOGIN_MOBILENO,
  UPDATE_LOGIN_PASSWORD,

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
  loginMobileNo:"",
  loginPassword:"",

};

export default (state = initialState, action) => {
  switch (action.type) {

    case RETRIEVE_TOKEN_SUCCESS:
    {
      return {
        ...state,
        token:action.payload,
        loggedIn:true
      }
    }
    case UPDATE_LOGIN_MOBILENO:
    {
      return {
        ...state,
        loginMobileNo:action.payload
      }
    }

    case UPDATE_LOGIN_PASSWORD:
    {
      return {
        ...state,
        loginPassword:action.payload
      }
    }



    default:
      return state;
  }
};
