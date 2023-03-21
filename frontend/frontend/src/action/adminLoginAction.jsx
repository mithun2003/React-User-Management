
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "../axios";

export const adminLoginUser = createAsyncThunk("auth/adminLoginUser", async (credentials) => {
  const response = await axios.post("/api/token/", credentials);
  const data = await response.data;
  if (response.status === 200) {
    localStorage.setItem("authToken",data.access)
    return jwt_decode(data.access);
  } else {
    throw new Error("Wrong credentials");
  }
});

let token = localStorage.getItem("authToken")
const initialState = {
  loading: false,
  error: null,
  success:false,
  user: token ? jwt_decode(token) : null,
  token: localStorage.getItem("authToken") || null,
  isAuthenticated : false,

};

const adminLoginAction = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      console.log("log out")
      state.user = null;
      state.token = null;
      localStorage.removeItem("authToken");
      state.isAuthenticated = false;
      state.success = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;

      })
      .addCase(adminLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = localStorage.getItem('authToken');
        state.error = null;
        state.success=true
        state.user=action.payload;
        state.isAuthenticated = true;

      })
      .addCase(adminLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success=false;
        state.isAuthenticated = false;

      });
  },
});

export const { setUser, logout } = adminLoginAction.actions;
export default adminLoginAction.reducer;
