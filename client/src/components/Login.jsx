import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { RotateLoader } from "react-spinners";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ username: "", password: "" });
  const [toastShown, setToastShown] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (formData) => {
    setData(formData);
    try {
      setIsLoading(true);
      document.cookie = `username = ${formData.username};expires=Tue, 29 Feb 2028 00:00:01 GMT`;
      document.cookie = `password = ${formData.password};expires=Tue, 29 Feb 2028 00:00.1 GMT`;
      if (!toastShown) {
        toast.success("User Login Successfully! Data added to cookies!!!", {
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
        setToastShown(true);
      }
      reset();
    } catch (error) {
      errorHandler(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCookie = () => {
    setData((prevData) => {
      document.cookie = `username=${prevData.username};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      document.cookie = `password=${prevData.password};expires=Thu, 01 Jan 1970 00:00:01 GMT`;

      return { username: "", password: "" };
    });

    if (!toastShown) {
      toast.info("Logout Successfully! Data removed from cookies!!!", {
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
      setToastShown(true);
    }
  };

  return (
    <div className="flex justify-center items-center login-bg">
      {isLoading && <RotateLoader color="#000000" />}
      {!isLoading && (
        <div className="flex flex-col pt-[5%] items-center h-[75vh] min-w-[20vw]">
          <h5 className="self-start font-medium text-xl">Log in</h5>
          <h2 className="self-start font-black text-3xl py-3">Welcome Back!</h2>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col justify-center items-center border-2 rounded-xl border-gray-500 p-[3%] lg:px-[2%] lg:py-[2%]"
          >
            <div className="my-2">
              <div className="group relative w-72 md:w-80 lg:w-96">
                <label
                  htmlFor="1"
                  className="block w-full pb-1 text-sm font-medium transition-all duration-200 ease-in-out group-focus-within:text-white"
                >
                  Username
                </label>
                <input
                  id="1"
                  type="text"
                  className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-black"
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
                  className="block w-full pb-1 text-sm font-medium transition-all duration-200 ease-in-out group-focus-within:text-white"
                >
                  Password
                </label>
                <input
                  id="2"
                  type="password"
                  className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-black"
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
                value={"LOG IN"}
                className="border-2 rounded-md hover:bg-green-500 hover:text-white border-green-500 px-4 py-2"
              />
              <button
                onClick={deleteCookie}
                className="border-2 rounded-md hover:bg-red-500 hover:text-white border-red-500 px-4 py-2"
              >
                LOG OUT
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Form;
