import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import Button from "./Button";
import Input from "./Input";

function Login() {
    //useForm() → Provides register (for inputs) and handleSubmit (for form submission).

  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");// Clear previous errors
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Sign in to your account
        </h2>

        {/* If no account */}
        <p className="text-center text-gray-600 mb-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) => value.includes("@") || "Invalid email",
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
