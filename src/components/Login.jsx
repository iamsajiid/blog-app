import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/slices/authSlice";
import Input from "./Input";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data.email, data.password);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="items-center justify-center w-full">
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign in to your account
      </h2>

      <p className="mt-2 text-center text-base text-black/60">
        Don&apos;t have any account?&nbsp;
        <Link
          to="/signup"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign Up
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form
        className="flex flex-col justify-center items-center p-6 rounded-lg bg-white max-w-max m-auto mt-5"
        onSubmit={handleSubmit(login)}
      >
        <div className="flex flex-col justify-center items-center gap-4">
          <Input
            label={"Email: "}
            placeholder={"Enter email"}
            name={"email"}
            type={"email"}
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          ></Input>

          <Input
            label={"Password: "}
            placeholder={"enter password"}
            name={"password"}
            type={"password"}
            {...register("password", {
              required: true,
            })}
          ></Input>

          <button
            type="submit"
            className="bg-white border-red-500 border-solid border focus:outline-blue-500 max-w-max p-3 rounded-lg"
          >
            login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
