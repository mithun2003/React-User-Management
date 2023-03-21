import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import axios from "../axios";

export const loginUser = createAsyncThunk("login/loginUser", async (credentials) => {
  const response = await axios.post("/api/token/", credentials);
  const data = await response.data;
  console.log(jwt_decode(data.access));
  if (response.status === 200) {
    console.log(data.access)
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
};

const loginAction = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log(action.payload)

    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = false
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success=false

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = localStorage.getItem('authToken');
        state.error = null;
        state.success=true
        state.user=action.payload;
        console.log(action.payload)

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success=false
      });
  },
});

export const { setUser, logout } = loginAction.actions;
export default loginAction.reducer;
