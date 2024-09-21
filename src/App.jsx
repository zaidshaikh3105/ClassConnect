import { useDispatch } from "react-redux";
import service from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useState, useEffect } from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    service
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Failed to fetch user", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  // Inline styles for flex layout
  const appStyles = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const mainStyles = {
    flex: 1,
  };

  return !loading ? (
    <div>
      <div className="w-full block">
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
