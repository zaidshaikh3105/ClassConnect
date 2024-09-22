import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Renamed loader to isLoading for clarity
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Redirect based on authentication status
    if (authentication) {
      if (authStatus !== true) {
        navigate("/login");
      }
    } else {
      if (authStatus === true) {
        navigate("/");
      }
    }
    setIsLoading(false);
  }, [authStatus, navigate, authentication]);

  // Display loading screen or protected content
  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
}
