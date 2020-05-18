import {
  Linking,
  IntentLauncherAndroid,
} from 'expo';
import { Alert, Platform } from 'react-native';
import { createApi } from './api';
import Navigation from "../navigation/NavigationService";
import NavigationService from '../navigation/NavigationService';


export const UPDATE_FULL_NAME = 'user/UPDATE_FULL_NAME';
export const UPDATE_EMAIL = 'user/UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'user/UPDATE_PASSWORD';
export const UPDATE_CONFIRM_PASSWORD = 'user/UPDATE_CONFIRM_PASSWORD';
export const UPDATE_PHONE = 'user/UPDATE_PHONE';
export const UPDATE_ADDRESS='user/UPDATE_ADDRESS'
export const SIGNUP_FORM_SUBMITTED = 'user/SIGNUP_FORM_SUBMITTED';
export const UPDATE_REGISTER_MOBILENO = 'user/UPDATE_REGISTER_MOBILENO';
export const ON_SEND_OTP_SUCCESS = "user/ON_SEND_OTP_SUCCESS";
export const ON_CHANGE_OTP = "user/ON_CHANGE_OTP";



export const updateFullName = val => dispatch =>{
  dispatch({
    type:UPDATE_FULL_NAME,
    payload:val
  })
}

export const updateEmail = val => dispatch =>{
  dispatch({
    type:UPDATE_EMAIL,
    payload:val
  })
}

export const updateAddress = val => dispatch =>{
  dispatch({
    type:UPDATE_ADDRESS,
    payload:val
  })
}

export const updatePassword = val => dispatch =>{
  dispatch({
    type:UPDATE_PASSWORD,
    payload:val
  })
}

export const updateConfirmPassword = val => dispatch =>{
  dispatch({
    type:UPDATE_CONFIRM_PASSWORD,
    payload:val
  })
}

export const updateRegisterMobileNo = val => dispatch =>{
  dispatch({
    type:UPDATE_REGISTER_MOBILENO,
    payload:val
  })
}

export const onSendOtp = val => async(dispatch,getState) =>{
  const {registerMobileno} = getState().user;
  const authData = {
    phone_number:registerMobileno,
  };
  let response = null;
  try {
    response = await createApi()
      .post('/otp', authData).then(res => res)
      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : err.message);
      });
      console.log(response);
      if(response.data.message === "success")
      {
        dispatch({
          type:ON_SEND_OTP_SUCCESS,
          payload:response.data.OTP
        })
        Navigation.navigate("Otp")
      }
      alert(response.data.message)
    }
    catch(err)
    {
      console.log(err);

    }
}

export const onChangeOTP = code => (dispatch) => {
  console.log(code)
  dispatch({
    type:ON_CHANGE_OTP,
    payload:code
  })
}

export const onMatchOtp = () => (dispatch,getState) => {
  const {otp,otpCode} = getState().user;
  console.log("otp"+otp);
  console.log("code :"+otpCode);

  if(otp.toString() === otpCode.toString()){
    Navigation.navigate('Register')
  } else {
    alert('गलत OTP, फिर से डाले')
  }

}
