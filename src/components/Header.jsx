import "../index.css";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../api/appwriteclient";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const session = await account.getSession("current");
        setIsAuthenticated(!!session); // If session exists, set to true
        if (session && window.location.pathname === "/login") {
          navigate("/home"); // Redirect to home if user is already logged in
        }
      } catch {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  // Sign out function
  const signOut = useCallback(async () => {
    try {
      await account.deleteSession("current");
      setIsAuthenticated(false); // Update authentication status
      navigate("/login"); // Redirect to login page after sign-out
    } catch (error) {
      if (error.code === 401) {
        navigate("/login"); // If already unauthenticated, redirect to login
      } else {
        console.error("Sign-out error:", error);
      }
    }
  }, [navigate]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-3xl">ClassConnect</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isAuthenticated && ( // Show Home link only if authenticated
            <li>
              <Link className="btn btn-ghost text-xl" to="/home">
                Home
              </Link>
            </li>
          )}
          <li>
            {isAuthenticated ? (
              <button className="btn btn-ghost text-xl" onClick={signOut}>
                Sign Out
              </button> // Show Sign Out if authenticated
            ) : (
              <Link className="btn btn-ghost text-xl" to="/login">
                Login
              </Link> // Show Login if not authenticated
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
