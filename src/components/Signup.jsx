import React, { useState } from "react";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const create = async (data) => {
    setError("");
    try {
      const newUser = await authService.createAccount(data);
      if (newUser) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(login(currentUser));
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
          Create an Account
        </h2>

        {/* If already have an account */}
        <p className="text-center text-gray-600 mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="space-y-4">
          <Input
            label="Name:"
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
            })}
          />
          <Input
            label="Email:"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              validate: {
                matchPattern: (value) =>
                  value.includes("@") || "Invalid email",
              },
            })}
          />
          <Input
            label="Password:"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
