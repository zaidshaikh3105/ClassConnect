import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // false means not authenticated, true means authenticated
  userData: null, // Will store user data if logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData; // Explicitly setting userData
    },
    logout: (state) => {
      state.status = false; // Set status to logged out
      state.userData = null; // Clear user data
    },
  },
});

// Exporting actions, reducer, and selectors
export const { login, logout } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.status;
export const selectUserData = (state) => state.auth.userData;

export default authSlice.reducer;
