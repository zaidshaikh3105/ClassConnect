import React from "react";
import { useDispatch } from "react-redux";
import authService from "/src/appwrite/auth.js";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const logOutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button className="btn" onClick={logOutHandler}>
      Log out
    </button>
  );
};

export default LogoutBtn;
