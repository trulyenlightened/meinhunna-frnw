
import {
  UPDATE_FULL_NAME,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_ADDRESS,
  UPDATE_CONFIRM_PASSWORD,
  UPDATE_PHONE,
  UPDATE_REGISTER_MOBILENO,
  ON_SEND_OTP_SUCCESS,
  ON_CHANGE_OTP,
  SELECTED_MURCHANT,
  GET_NEARBY_SUCCESS,
  ON_SELECTED_ITEM,
  ON_CHANGE_TEXT_ITEM_SELECT,
  UPDATE_QTY,
  GET_USER_DATA
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
  otpCode:'',
  passwordChange:false,
  passwordConfirmChange:false,
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
        passwordChange:true,
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
        passwordConfirmChange:true,
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

    case GET_USER_DATA:
    {
      console.log(action.payload);
      
      return {
        ...state,
        fullName:action.payload.name,
        registerMobileno:action.payload.phone_number,
        fullAddress:action.payload.address,
        email:action.payload.email

      }
    }


    default:
      return state;
  }
};
