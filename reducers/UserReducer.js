
import {
  UPDATE_FULL_NAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_ADDRESS,
  UPDATE_CONFIRM_PASSWORD,
  UPDATE_PHONE,
  UPDATE_REGISTER_MOBILENO,
  ON_SEND_OTP_SUCCESS,
  ON_CHANGE_OTP
} from '../actions/user';

import { SIGNUP_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  signup: {
    touched: false,
    submitted: false,
  },
  id: null,
  fullName: null,
  email: null,
  password: null,
  confirmPassword: null,
  phone: null,
  fullAddress: null,
  registerMobileno:'',
  otp:'',
  otpCode:''
};

export default (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_FULL_NAME:
      return {
        ...state,
        fullName: action.payload,
        signup: {
          touched: true,
          submitted: false,
        },
      };



    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
        signup: {
          touched: true,
          submitted: false,
        },
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
        signup: {
          touched: true,
          submitted: false,
        },
      };
      case UPDATE_ADDRESS:
        return {
          ...state,
          fullAddress: action.payload,
          signup: {
            touched: true,
            submitted: false,
          },
        };

    case UPDATE_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: action.payload,
        signup: {
          touched: true,
          submitted: false,
        },
      };

    case UPDATE_PHONE:
      return {
        ...state,
        phone: action.payload,
        signup: {
          touched: true,
          submitted: false,
        },
      };
    
    case UPDATE_REGISTER_MOBILENO:
    {
      return {
        ...state,
        registerMobileno:action.payload
      }
    }


    case ON_SEND_OTP_SUCCESS:
    {
      return {
        ...state,
        otp:action.payload
      }
    }

    case ON_CHANGE_OTP:
    {
      return {
        ...state,
        otpCode:action.payload
      }
    }

    default:
      return state;
  }
};
