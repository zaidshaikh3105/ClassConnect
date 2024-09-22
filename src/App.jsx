import { useDispatch } from "react-redux";
import service from "./appwrite/auth"; // Authentication service for Appwrite
import { login, logout } from "./store/authSlice";
import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For handling errors
  const dispatch = useDispatch();

  useEffect(() => {
    service
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData })); // Ensure userData matches the shape expected by your authSlice
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => {
        console.error("Error fetching current user:", err);
        setError("Failed to fetch user data.");
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return !loading ? (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <Header />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
      </div>

      <Footer className="mt-auto" />
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
}

export default App;
