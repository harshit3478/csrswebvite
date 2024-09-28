import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading , setLoading] = useState(false);
  const { user, dispatch } = useAuthContext();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/admin/v1/login`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          method: "POST",
        }
      );
      const json = await res.json();

      console.log("data is :", json.data);
      if (json.isSuccess) {
        const user = { id: json.data.id, name: json.data.name, token: json.data.token };
        dispatch({ type: 'LOGIN', payload: user });
        localStorage.setItem('user', JSON.stringify(user)); // Convert user object to JSON string
        console.log(user);
        navigate("/");
      }
    } catch (error) {
      console.log("error in login is:", error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="login flex justify-center flex-col items-center h-[100vh] align-middle">
      <form
        className="w-2/5 m-10 rounded-md py-5 shadow-md shadow-slate-800  bg-blend-lighten flex-col  justify-center flex text-white"
        style={{ width: "27%", background: "#292929" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl place-content-center text-center font-bold m-3">
          Login
        </h1>
        <div className="border-b border-slate-100"></div>
        <div className="p-4 pb-0 m-0">
          <div className="Name m-2 flex justify-start flex-col p-1">
            <input
              type="text"
              placeholder="Enter Name"
              className={`outline-none border-slate-200 bg-transparent placeholder:text-white w-full p-2 my-2 rounded-sm border-b-2 ${
                errors.name ? "border-red-500" : "border-slate-500"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message as string}</p>
            )}
          </div>
          <div className="password m-2 flex justify-self-start flex-col p-1 relative  items-start">
            <div className="password flex justify-between items-center w-full p-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className={`outline-none w-full p-2 my-2 rounded-sm border-b-2 border-slate-200 bg-transparent placeholder:text-white ${
                  errors.password ? "border-red-500" : "border-slate-500"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <button
                type="button"
                className="bg-blend-normal"
                onClick={toggleShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500">
                {errors.password.message as string}
              </p>
            )}
            <a
              href="/login"
              className="text-left text-slate-50 font-serif my-3 hover:text-slate-200  hover:underline"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            {...(loading ? { disabled: true } : {})}
            className="rounded-sm my-4 m-1 p-2 font-semibold text-lg w-full outline-2 outline-black disabled:cursor-progress hover:bg-[#090909] focus:outline outline"
          >
            Login
          </button>
        </div>
        <div className="text-center m-0 p-0">
          Not a member?{" "}
          <a
            href="/signup"
            className="text-sky-400 hover:text-slate-500 hover:underline"
          >
            Sign Up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
