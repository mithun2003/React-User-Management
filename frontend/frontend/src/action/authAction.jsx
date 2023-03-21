import { createSlice } from '@reduxjs/toolkit';
let token = localStorage.getItem('authToken')
const initialState = {
  auth: token ? true : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state) => {
      console.log('setAuth reducer called');
      state.auth = true ;
      console.log(localStorage.getItem('authToken'))

    },
    clearAuth: (state) => {
      state.auth = null;
      console.log('setAuth reducer discalled');
      console.log(token)

    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
