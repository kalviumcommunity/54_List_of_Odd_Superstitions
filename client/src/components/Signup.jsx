import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const submitHandler = async (formData) => {
    setData(formData);
    try {
      setIsLoading(true);
      const res = await axios.post(
        "http://localhost:3000/superstition/signup",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201) {
        toast.success(
          "User Signup Successfully! Redirecting to Login page...",
          {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Flip,
          }
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        throw new Error("Failed to signup user. Please try agian later...");
      }
      reset();
    } catch (error) {
      console.log("error: ", error);
      if (error.response && error.response.status === 400) {
        toast.error("User already exists with this username.", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      } else {
        errorHandler(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const errorHandler = (err) => {
    toast.error(err, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  };

  return (
    <div className="flex justify-center items-center h-[75vh] signup-container">
      {isLoading && <RotateLoader color="#000000" />}
      {!isLoading && (
        <div className="flex flex-col items-center justify-center h-[75vh] min-w-[20vw]">
          <h5 className="self-start font-medium text-xl highlight">Sign Up</h5>
          <h2 className="self-start font-black text-3xl py-3 highlight">
            Hey Welcome!
          </h2>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col justify-center items-center border-2 rounded-xl border-gray-500 p-[3%] lg:p-[2%]"
          >
            <div className="my-2">
              <div className="group relative w-72 md:w-80 lg:w-96">
                <label
                  htmlFor="1"
                  className="block w-full pb-1 text-sm font-medium text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                >
                  Username
                </label>
                <input
                  id="1"
                  type="text"
                  className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                  name="username"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username cannot be less than 3 characters.",
                    },
                  })}
                />
              </div>
              <p className="text-red-600 font-medium text-sm">
                {errors.username?.message}
              </p>
            </div>

            <div className="my-2">
              <div className="group relative w-72 md:w-80 lg:w-96">
                <label
                  htmlFor="2"
                  className="block w-full pb-1 text-sm font-medium text-white transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
                >
                  Password
                </label>
                <input
                  id="2"
                  type="password"
                  className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
                  name="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password cannot be less than 6 characters.",
                    },
                  })}
                ></input>
              </div>
              <p className="text-red-600 font-medium text-sm">
                {errors.password?.message}
              </p>
            </div>

            <div className=" mt-1 flex justify-around w-full">
              <input
                type="submit"
                value={"SIGN UP"}
                className="border-2 text-white hover:bg-green-500 border-green-500 px-4 py-2"
              />
              <button
                onClick={() => reset()}
                className="border-2 hover:bg-red-500 text-white border-red-500 px-4 py-2"
              >
                RESET
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Signup;
