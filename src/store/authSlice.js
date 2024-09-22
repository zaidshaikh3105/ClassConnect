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

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
