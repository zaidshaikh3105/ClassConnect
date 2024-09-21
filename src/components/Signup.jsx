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
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const handleSignUp = async (data) => {
    setError("");
    try {
      const userAccount = await service.createAccount(data); // Assuming authservice.createAccount expects an object
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
    <div>
      <h2>Sign up</h2>
      {error && <p className="text-red-600 mt-8">{error}</p>}
      <form onSubmit={handleSubmit(handleSignUp)} className="mt-8">
        <div className="space-y-5">
          <InputField
            label="Name"
            placeholder="Enter Your Name"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
          />
        </div>
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
        </div>
        <Button type="submit">Create account</Button>
      </form>
    </div>
  );
};

export { Signup }; // Named export
export default Signup;
