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
  } = useForm(); // Extract errors from formState
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser(); // Fetch user data
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-500 p-5">
      <div className="bg-base-100 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Sign in to your Account
        </h2>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
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
            <p className="text-red-600">{errors.email.message}</p>
          )}{" "}
          {/* Adjusted for error display */}
          <InputField
            label="Password"
            placeholder="Enter Your Password"
            type="password"
            className="border-white focus:border-white focus:ring focus:ring-white"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}{" "}
          {/* Adjusted for error display */}
          <Button type="submit" className="text-white mt-4 w-full ">
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
