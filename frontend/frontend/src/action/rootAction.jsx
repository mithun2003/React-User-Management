import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authAction';
import registerSlice from './registerAction'
import loginSlice from './loginAction'
import userSlice from './userAction'
import adminLoginSlice from './adminLoginAction'
const rootReducer = combineReducers({
  auth: authSlice,
  register:registerSlice,
  login:loginSlice,
  users:userSlice,
  adminlogin:adminLoginSlice,
});

export default rootReducer;
