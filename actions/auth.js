import PlatformStorage from '../storage';
import { createApi } from './api';

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
export const UPDATE_REGISTER_MOBILENO = 'auth/UPDATE_REGISTER_MOBILENO'


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

  const {
    loginMobileNo,
    loginPassword,
  } = getState().auth;
  console.log(loginMobileNo);

  
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

      console.log(response);
      
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data.access_token,
    });

    await PlatformStorage.set('authToken', response.data.access_token);

    dispatch({
      type: TOKEN_SAVED,
    });
    dispatch(retrieveAuthToken());
  } catch (err) {
    if (err.message === 'Email is not verified.') {
      Navigation.navigate('VerifyEmail');
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
    confirmPassword,
    phone,
    birthDate,
    fullAddress
  } = getState().user;

  const signupData = {
    fullName,
    email,
    password,
    confirmPassword,
    phone,
    fullAddress
  };
  dispatch({
    type: SIGNUP_STARTED,
    payload: signupData,
  });

  try {
    const response = await createApi()
      .post('/', signupData)
      .catch((err) => {
        throw new Error(err.response.data.message);
      });

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });

    Navigation.navigate('VerifyEmail');
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

export const updateRegisterMobileNo = val => dispatch =>{
  dispatch({
    type:UPDATE_REGISTER_MOBILENO,
    payload:val
  })
}

export const onSendOtp = val => async(dispatch,getState) =>{
  const {registerMobileno} = getState().auth;
  console.log(registerMobileno);
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
      
    }
    catch(err)
    {
      console.log(err);
      
    }
}
