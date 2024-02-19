import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RotateLoader } from "react-spinners";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditForm.css";

const EditForm = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitted, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const getDataById = async () => {
    const res = await axios.get(
      `https://odd-superstitions.onrender.com/superstition/${id}`
    );
    setTitle(res.data.title);
    setDescription(res.data.description);
  };
  useEffect(() => {
    getDataById();
  }, [id]);

  const submitHandler = async (formData) => {
    setData(formData);
    try {
      setIsLoading(true);
      const res = await axios.patch(
        `https://odd-superstitions.onrender.com/superstition/${id}`,
        formData
      );
      setTitle(res.data.title);
      setDescription(res.data.description);

      if (res.status === 200) {
        toast.success("Superstition Updated Successfully!", {
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
        setTimeout(() => {
          reset();
          navigate("/");
        }, 2000);
      } else {
        throw new Error(
          "Failed to update superstition. Please try agian later..."
        );
      }
      reset();
    } catch (error) {
      errorHandler(error.message);
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
    <div className="flex flex-col justify-center items-center h-[75vh] edit-form-container">
      {isLoading && <RotateLoader color="#000000" />}
      {!isLoading && (
        <>
          <h1 className="text-3xl font-black mb-4">Update Superstition</h1>
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
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={title}
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
                <textarea
                  id="2"
                  type="text"
                  onChange={(e) => e.target.value}
                  defaultValue={description}
                  rows={4}
                  className="flex min-h-[60px] w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  name="description"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 5,
                      message: "Description cannot be less than 5 characters.",
                    },
                  })}
                ></textarea>
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
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default EditForm;
