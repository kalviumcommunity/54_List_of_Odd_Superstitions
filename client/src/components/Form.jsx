import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RotateLoader } from "react-spinners";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Form.css";

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm();

  const submitHandler = async (formData) => {
    setData(formData);
    try {
      const res = await axios.post(
        "https://odd-superstitions.onrender.com/superstition",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 201) {
        toast.success("Superstition Added Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      } else {
        throw new Error(
          "Failed to submit superstition. Please try agian later..."
        );
      }
      reset();
    } catch (error) {
      errorHandler(error.message);
    }
  };

  const errorHandler = (err) => {
    toast.error(err, {
      position: "top-right",
      autoClose: 5000,
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
    <div className="flex justify-center items-center h-[75vh] form-container">
      {isLoading && <RotateLoader color="#000000" />}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center items-center border-2 rounded-xl border-gray-500 p-[3%] lg:px-[1%] lg:py-[2%]"
      >
        <div className="my-2">
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label
              htmlFor="1"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Title
            </label>
            <input
              id="1"
              type="text"
              className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
              name="title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 3,
                  message: "Title cannot be less than 3 characters.",
                },
              })}
            />
          </div>
          <p className="text-red-600 font-medium text-sm">
            {errors.title?.message}
          </p>
        </div>

        <div className="my-2">
          <div className="group relative w-72 md:w-80 lg:w-96">
            <label
              htmlFor="2"
              className="block w-full pb-1 text-sm font-medium text-gray-500 transition-all duration-200 ease-in-out group-focus-within:text-blue-400"
            >
              Description
            </label>
            <input
              id="2"
              type="text"
              className="peer h-10 w-full rounded-md bg-gray-50 px-4 font-thin outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:ring-2 focus:ring-blue-400"
              name="description"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 5,
                  message: "Description cannot be less than 5 characters.",
                },
              })}
            />
          </div>
          <p className="text-red-600 font-medium text-sm">
            {errors.description?.message}
          </p>
        </div>

        <div className=" mt-1 flex justify-around w-full">
          <input
            type="submit"
            value={"Add Superstition"}
            className="border-2 hover:bg-green-500 hover:text-white border-green-500 px-4 py-2"
          />
          <button
            onClick={() => reset()}
            className="border-2 hover:bg-red-500 hover:text-white border-red-500 px-4 py-2"
          >
            RESET
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Form;
