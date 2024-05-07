import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import authService from "../services/auth";
import { useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/slices/authSlice";
import Input from "./Input";

function Login() {
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
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
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
      </div>

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
      <form onSubmit={handleSubmit(login)}>
        <div>
          <Input
            label={"Email: "}
            placeholder={"Enter email"}
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
            type={"password"}
            {...register("password", {
              required: true,
            })}
          ></Input>

          <button className="w-full" type="submit">
            login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
