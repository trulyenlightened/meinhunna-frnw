import {
  Linking,
  IntentLauncherAndroid,
} from 'expo';
import { Alert, Platform } from 'react-native';

import NavigationService from '../navigation/NavigationService';


export const UPDATE_FIRST_NAME = 'user/UPDATE_FIRST_NAME';
export const UPDATE_LAST_NAME = 'user/UPDATE_LAST_NAME';
export const UPDATE_EMAIL = 'user/UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'user/UPDATE_PASSWORD';
export const UPDATE_CONFIRM_PASSWORD = 'user/UPDATE_CONFIRM_PASSWORD';
export const UPDATE_PHONE = 'user/UPDATE_PHONE';
export const UPDATE_ADDRESS='user/UPDATE_ADDRESS'
export const SIGNUP_FORM_SUBMITTED = 'user/SIGNUP_FORM_SUBMITTED';
