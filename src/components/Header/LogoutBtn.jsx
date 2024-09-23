import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "/src/appwrite/auth.js";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const navigate = useNavigate();
  const logOutHandler = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/");
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
      {isLoading ? (
        <div className="w-full py-8 mt-4 text-center">
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        </div>
      ) : (
        "Log out"
      )}
    </button>
  );
};

export default LogoutBtn;
