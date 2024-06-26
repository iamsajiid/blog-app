import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth";
import { login as storeLogin } from "../store/slices/authSlice";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Signup() {
  const { handleSubmit, register } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createUser(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(storeLogin(userData));
          console.log(userData)
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className=" items-center justify-center">
      {/* <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
      </div> */}
      <h2 className="text-center text-2xl font-bold leading-tight">
        Sign up to create account
      </h2>
      <p className="mt-2 text-center text-base text-black/60">
        Already have an account?&nbsp;
        <Link
          to="/login"
          className="font-medium text-primary transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form className="flex flex-col justify-center items-center space-y-4 p-6 rounded-lg bg-white max-w-max m-auto mt-5" onSubmit={handleSubmit(create)}>
        <Input
          label={"Name: "}
          placeholder={"Enter name: "}
          type={"name"}
          {...register("name", {
            required: true,
          })}
        ></Input>
        <Input
          label={"Email: "}
          placeholder={"Enter mail: "}
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
          label={"Password"}
          placeholder={"Enter password"}
          type={"password"}
          {...register("password", {
            required: true,
          })}
        ></Input>
        <button type="submit" className="bg-white border-red-500 border-solid border focus:outline-blue-500 max-w-max p-3 rounded-lg">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
