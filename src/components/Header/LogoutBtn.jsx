import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "/src/appwrite/auth.js";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const logOutHandler = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Error during logout:", error);
      // Optionally, handle the error in the UI (e.g., show a message)
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <button
      className={`btn text-white btn-ghost ${isLoading ? "loading" : ""}`} // Add loading class if isLoading is true
      onClick={logOutHandler}
      disabled={isLoading} // Disable button while loading
    >
      {isLoading ? "Logging out..." : "Log out"}
    </button>
  );
};

export default LogoutBtn;
