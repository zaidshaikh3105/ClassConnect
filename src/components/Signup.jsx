import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, InputField } from "../components";
import { useDispatch } from "react-redux";
import service from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  const handleSignUp = async (data) => {
    setError("");
    try {
      const userAccount = await service.createAccount(data);
      if (userAccount) {
        const userData = await service.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error?.message || "An error occurred during account creation");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-500 p-5">
      <div className="bg-base-100 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4 text-white">
          Sign up
        </h2>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-5">
          <InputField
            label="Name"
            placeholder="Enter Your Name"
            type="text"
            className="border-white focus:border-white focus:ring focus:ring-white"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}

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
          )}

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
          )}

          <Button type="submit" className="text-white mt-4 w-full">
            Create account
          </Button>
        </form>
      </div>
    </div>
  );
};

export { Signup }; // Named export
export default Signup;
