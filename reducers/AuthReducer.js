import {
  RETRIEVE_TOKEN_SUCCESS,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_LOGIN_MOBILENO,
  UPDATE_LOGIN_PASSWORD,
  ON_HELP_LINE,
  SIGNUP_STARTED,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE
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
  isHelpLineModal:false,
  loadingRegister:false
};

export default (state = initialState, action) => {
  switch (action.type) {

    case RETRIEVE_TOKEN_SUCCESS:
    {
      return {
        ...state,
        token:action.payload,
        loggedIn:action.payload?true:false
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

    case SIGNUP_STARTED:
    {
      return {
        ...state,
        loadingRegister:true
      }
    }

    case SIGNUP_SUCCESS:
    {
      return {
        ...state,
        loadingRegister:false
      }
    }

    case SIGNUP_FAILURE:
    {
      return {
        ...state,
        loadingRegister:false
      }
    }

    case ON_HELP_LINE: 
    {
      return {
        ...state,
        isHelpLineModal:action.payload
      }
    }


    default:
      return state;
  }
};
