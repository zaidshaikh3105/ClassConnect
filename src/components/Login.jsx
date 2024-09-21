import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, InputField } from "../components";
import { useDispatch } from "react-redux";
import service from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleLogin = async (data) => {
    setError("");
    try {
      const session = await service.login(data); // Assuming authservice.login expects an object
      if (session) {
        const userData = await service.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error?.message || "An error occurred during login");
    }
  };

  return (
    <div>
      Login
      <div>
        <h2>Sign in to your Account</h2>
      </div>
      {error && <p className="text-red-600 mt-8">{error}</p>}
      <form onSubmit={handleSubmit(handleLogin)} className="mt-8">
        <div className="space-y-5">
          <InputField
            label="Email"
            placeholder="Enter Your Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email format",
              },
            })}
          />
        </div>
        <div className="space-y-5">
          <InputField
            label="Password"
            placeholder="Enter Your Password"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
