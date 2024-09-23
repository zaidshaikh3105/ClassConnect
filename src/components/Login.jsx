import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, InputField } from "../components";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      console.log("Login error on main:", error);
      let message = "An unexpected error occurred. Please try again.";

      switch (error.code) {
        case 400:
          switch (error.type) {
            case "user_password_mismatch":
              message =
                "Passwords do not match. Please check the password and confirm password.";
              break;
            case "user_not_found":
              message = "User not found. Please sign up.";
              break;
          }
          break;
        case 401:
          switch (error.type) {
            case "user_invalid_credentials":
              message =
                "Invalid credentials. Please check the email and password.";
              break;
            case "user_blocked":
              message =
                "Your account has been blocked. Please contact support.";
              break;
            // Add other specific 401 cases here
          }
          break;
        case 429: // Rate limit exceeded
          message =
            "Rate limit for the current user has been exceeded. Please try again after some time.";
          break;
        // Add other status codes as needed
        default:
          message = error.message || message; // Use default message if no specific case matched
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-500 p-5">
      <div className="bg-base-100 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Sign in to your Account
        </h2>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          <InputField
            label="Email"
            placeholder="Enter Your Email"
            type="email"
            className="border-white focus:border-white focus:ring focus:ring-white"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <InputField
            label="Password"
            placeholder="Enter Your Password"
            type="password"
            className="border-white focus:border-white focus:ring focus:ring-white"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <Button type="submit" className="text-white mt-4 w-full relative">
            {loading ? (
              <span className="loading loading-spinner loading-sm absolute left-1/2 transform -translate-x-1/2"></span>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
