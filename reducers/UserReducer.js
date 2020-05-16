
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
  ON_ADD_ITEMS,
  ON_SELECTED_ITEM,
  ON_CHANGE_TEXT_ITEM_SELECT,
  UPDATE_QTY
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
  murchantList:[],
selectedMurchant:"",
isModalItem:false,
finalItem:"",
finalQty:"",
orderItem:[],
orderQty:[]

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
    
    case SELECTED_MURCHANT:
    {
      return {
        ...state,
        selectedMurchant:action.payload
      }
    }

    case GET_NEARBY_SUCCESS:
    {
      return {
        ...state,
        murchantList:action.payload
      }
    }

    case ON_ADD_ITEMS:
    {
      return {
        ...state,
        isModalItem:true
      }
    }

    case ON_SELECTED_ITEM:
    {
      var items = state.orderItem
      items.push(action.payload.finalItem)
      var qty = state.orderQty
      qty.push(action.payload.finalQty)
      console.log(qty);
      
      return {
        ...state,
        isModalItem:false,
        orderItem:[...items],
        orderQty:[...qty]
      }
    }

    case ON_CHANGE_TEXT_ITEM_SELECT:
    {
      return {
        ...state,
        finalItem:action.payload
      }
    }

    case UPDATE_QTY:
    {
      return {
        ...state,
        finalQty:action.payload
      }
    }

    default:
      return state;
  }
};
