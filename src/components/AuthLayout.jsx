import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Renamed loader to isLoading for clarity
  const authStatus = useSelector((state) => !!state.auth.status); // Ensure it's a boolean

  useEffect(() => {
    if (authStatus === undefined) return; // Wait for authStatus

    if (authentication) {
      if (authStatus !== true) {
        navigate("/login");
      } else {
        setIsLoading(false); // Only stop loading if the user is authenticated
      }
    } else {
      if (authStatus === true) {
        navigate("/home");
      } else {
        setIsLoading(false); // Only stop loading if the user is not authenticated
      }
    }
  }, [authStatus, navigate, authentication]);
  // Display loading screen or protected content
  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
}
