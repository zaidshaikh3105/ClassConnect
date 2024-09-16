import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account, ID } from "../api/appwriteclient";

const LoginSignupTabs = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("login"); // State to control the active tab
  const [error, setError] = useState(""); // State to manage error messages
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const checkAuthStatus = async () => {
    try {
      const session = await account.getSession("current");
      if (session) {
        navigate("/home");
      }
    } catch (error) {
      // No active session, continue
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [navigate]);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setLoggedInUser(user);
      navigate("/home"); // Redirect to home page on success
    } catch (error) {
      setError(error.message); // Capture the error message
      setShowErrorModal(true); // Open error modal
    }
  };

  const signUp = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password); // Automatically log the user in after signing up
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      setError(error.message); // Capture the error message
      setShowErrorModal(true); // Open error modal
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 shadow-md rounded-md">
        <div className="tabs tabs-boxed mb-4">
          <a
            className={`tab ${activeTab === "login" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </a>
          <a
            className={`tab ${activeTab === "signup" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </a>
        </div>

        {/* Conditional rendering based on active tab */}
        {activeTab === "login" ? (
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => login(email, password)}
              >
                Login
              </button>
            </div>
          </form>
        ) : (
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => signUp(email, password, name)}
              >
                Sign Up
              </button>
            </div>
          </form>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="modal">
            <div className="modal-box">
              <h2>Registration Successful</h2>
              <p>You have successfully registered and logged in.</p>
              <button onClick={() => setShowSuccessModal(false)}>Close</button>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="modal">
            <div className="modal-box">
              <h2>Error</h2>
              <p>{error}</p>
              <button onClick={() => setShowErrorModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSignupTabs;
