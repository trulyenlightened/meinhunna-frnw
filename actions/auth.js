import PlatformStorage from '../storage';
import { createApi } from './api';
import Navigation from "../navigation/NavigationService";

export const TOKEN_SAVED = 'auth/TOKEN_SAVED';
export const RETRIEVE_TOKEN_STARTED = 'auth/RETRIEVE_TOKEN_STARTED';
export const RETRIEVE_TOKEN_SUCCESS = 'auth/RETRIEVE_TOKEN_SUCCESS';
export const RETRIEVE_TOKEN_FAILURE = 'auth/RETRIEVE_TOKEN_FAILURE';
export const UPDATE_EMAIL = 'auth/UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'auth/UPDATE_PASSWORD';
export const UPDATE_CONFIRM_PASSWORD = 'auth/UPDATE_CONFIRM_PASSWORD';
export const LOGIN_STARTED = 'auth/LOGIN_STARTED';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
export const SIGNUP_STARTED = 'auth/SIGNUP_STARTED';
export const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';
export const LOGOUT_STARTED = 'auth/LOGOUT_STARTED';
export const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';
export const LOGIN_FORM_SUBMITTED = 'auth/SIGNUP_FORM_SUBMITTED';
export const RESET_PASSWORD_SUCCESS = 'auth/RESET_PASSWORD_SUCCESS';
export const UPDATE_LOGIN_MOBILENO = 'auth/UPDATE_LOGIN_MOBILENO';
export const UPDATE_LOGIN_PASSWORD = 'auth/UPDATE_LOGIN_PASSWORD';



export const retrieveAuthToken = () => async (dispatch) => {

  dispatch({
    type: RETRIEVE_TOKEN_STARTED,
  });

  let token = null;

  try {
    token = await PlatformStorage.get('authToken');

    dispatch({
      type: RETRIEVE_TOKEN_SUCCESS,
      payload: token,
    });
  } catch (err) {
    dispatch({
      type: RETRIEVE_TOKEN_FAILURE,
      payload: err,
    });
  }

  return null;
};

export const updateEmail = email => (dispatch) => {
  dispatch({
    type: UPDATE_EMAIL,
    payload: email.toLowerCase(),
  });
};



export const updatePassword = password => (dispatch) => {
  dispatch({
    type: UPDATE_PASSWORD,
    payload: password,
  });
};

export const logout = password => async(dispatch) => {
  await PlatformStorage.clear();
  // Navigation.resetToLogin();
   dispatch(retrieveAuthToken());

};

export const updateConfirmPassword = password => (dispatch) => {
  dispatch({
    type: UPDATE_CONFIRM_PASSWORD,
    payload: password,
  });
};

export const authenticate = isValid => async (dispatch, getState) => {
  if (!isValid) {
    dispatch({
      type: LOGIN_FORM_SUBMITTED,
    });
    return null;
  }
  Navigation.navigate('OrderForm')
  const {
    loginMobileNo,
    loginPassword,
  } = getState().auth;


  const authData = {
    phone_number:loginMobileNo,
    password:loginPassword,
  };
  let response = null;

  dispatch({
    type: LOGIN_STARTED,
  });

  try {
    response = await createApi()
      .post('/auth', authData).then(res => res)
      .catch((err) => {
        throw new Error(err.response ? err.response.data.message : err.message);
      });
      console.log(response.data.user);
      // "user": Object {
      //        "address": "nikol",
      //     "created_at": "2020-05-24T04:42:39.856614",
      //     "id": 54,
      //     "name": "Hiren patel",
      //     "phone_number": "9601944914",
      //    },
        
    if(response.data.access_token){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data.access_token,
      });
      Navigation.navigate('OrderForm')
      await PlatformStorage.set('authToken', response.data.access_token);
      
      dispatch({
        type: TOKEN_SAVED,
      });
      // await PlatformStorage.set('address', response.data.user.address);
      // await PlatformStorage.set('name', response.data.user.name);
      // await PlatformStorage.set('phone_number', response.data.user.phone_number);
      // await PlatformStorage.set('loginPassword', loginPassword);
      dispatch(retrieveAuthToken());
    }
  } catch (err) {
    console.log(err);
    alert(err)

    if (err.message === 'Email is not verified.') {
      dispatch({
        type: LOGIN_FAILURE,
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.message,
      });
    }
  }

  return null;
};



export const signup = () => async (dispatch, getState) => {
  const {
    fullName,
    email,
    password,
    registerMobileno,
    fullAddress
  } = getState().user;

  const signupData = {
  phone_number: registerMobileno,
	email: email,
	name: fullName,
	address: fullAddress,
	password: password
  };

  dispatch({
    type: SIGNUP_STARTED,
    payload: signupData,
  });

  try {
    const response = await createApi()
      .post('/users', signupData)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
      if(response.data){
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: response.data,
        });
        alert("हमारे साथ जुड़ने के लिए आभार, आप हमारे "+`${response.data.user.user_count}  वे ग्राहक है`)
        Navigation.navigate('Login')
      }

  } catch (err) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: err.message,
    });
  }

  return null;
};

export const updateLoginMobileNo = (val) => dispatch =>{
  dispatch({
    type:UPDATE_LOGIN_MOBILENO,
    payload:val
  })
}

export const updateLoginPassword = (val) => dispatch =>{
  dispatch({
    type:UPDATE_LOGIN_PASSWORD,
    payload:val
  })
}
