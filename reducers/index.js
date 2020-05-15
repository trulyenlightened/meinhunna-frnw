import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import OrderReducer from './OrderReducer';


export default combineReducers({
  auth: AuthReducer,
  order:OrderReducer,
  user:UserReducer
});
