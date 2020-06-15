import {
  Linking,
  IntentLauncherAndroid,
} from 'expo';
import { Alert, Platform } from 'react-native';
import { createApi } from './api';
import Navigation from "../navigation/NavigationService";
import NavigationService from '../navigation/NavigationService';
import PlatformStorage from '../storage';


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
export const ON_FORGOT_PASSWORD_SUCCESS = "user/ON_FORGOT_PASSWORD_SUCCESS";
export const GET_USER_DATA = "user/GET_USER_DATA";




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



export const forgotPasswordApi = val => async(dispatch,getState) =>{
  const {registerMobileno,confirmPassword} = getState().user;
  const authData = {
    phone_number:registerMobileno,
    password:confirmPassword
  };
  let response = null;
  try {
    response = await createApi()
      .post('/users/forgotpassword', authData).then(res => res)
      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : err.message);
      });


          alert(response.data.message)
        dispatch({
          type:ON_FORGOT_PASSWORD_SUCCESS,
        })
        Navigation.resetToLogin();

    }
    catch(err)
    {
      console.log(err);

    }
}


export const onSendForgotOtp = val => async(dispatch,getState) =>{
  const {registerMobileno} = getState().user;
  const authData = {
    phone_number:registerMobileno,
  };
  let response = null;
  try {
    response = await createApi()
      .post('/users/forgotpasswordotp', authData).then(res => res)
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
        Navigation.navigate("Otp",{path:''})
      }
      else{
      alert(response.data.message)
    }
    }
    catch(err)
    {
      console.log(err);

    }
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

      if(response.data.message === "success")
      {
        dispatch({
          type:ON_SEND_OTP_SUCCESS,
          payload:response.data.OTP
        })
        Navigation.navigate("Otp",{path:'register'})
      }
      else{
      alert(response.data.message)
    }
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

export const onMatchOtp = (path) => (dispatch,getState) => {
  const {otp,otpCode} = getState().user;
  console.log("otp"+otp);
  console.log("code :"+otpCode);
  if(otp.toString() === otpCode.toString()){
  path==='register'?  Navigation.navigate('Register'):Navigation.navigate('ForgotPassword')
  } else {
    alert('गलत OTP, फिर से डाले')
  }

}

export const updateProfile = () => async (dispatch,getState) =>{
  const {
    fullName,
    email,
    password,
    registerMobileno,
    fullAddress
  } = getState().user;
  const state = getState();
  const signupData = {
  phone_number: registerMobileno,
	email: email,
	name: fullName,
	address: fullAddress,
  };

  try {
    const response = await createApi(state)
      .put('/users', signupData)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
      //console.error(response);

      if(response.data.user){
       alert("Profile Successfully Updated.")
      }

  } catch (err) {
    alert(err)


  }

  return null;
}

export const getUserData = () => async(dispatch,getState) =>{
  const state = getState();
  try {
    const response = await createApi(state)
      .get('/users')
      .catch((err) => {
        return
      //   console.error(err);
      // throw new Error(err.response.data.message);
      });
      //console.error(response.data[0]);
      var address = response.data[0].address;
      var name = response.data[0].name;
      var phone_number = response.data[0].phone_number;
      var email = response.data[0].email
      if(response.data){
        dispatch({
          type:GET_USER_DATA,
          payload:{name,address,phone_number,email}
        })
      }

  } catch (err) {
    console.error(err);

  }

  var address = await PlatformStorage.get('address');
  var name = await PlatformStorage.get('name');
  var phone_number = await PlatformStorage.get('phone_number');
  var loginPassword = await PlatformStorage.get('loginPassword');


}
