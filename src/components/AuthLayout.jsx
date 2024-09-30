import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const authStatus = useSelector((state) => !!state.auth.status);

  useEffect(() => {
    if (authStatus === undefined) return;

    if (authentication) {
      if (authStatus !== true) {
        navigate("/login");
      } else {
        setIsLoading(false);
      }
    } else {
      if (authStatus === true) {
        navigate("/home");
      } else {
        setIsLoading(false);
      }
    }
  }, [authStatus, navigate, authentication]);
  return isLoading ? <h1>Loading...</h1> : <>{children}</>;
}
