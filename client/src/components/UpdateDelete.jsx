import React, { useEffect, useState } from "react";
import axios from "axios";
import { RotateLoader } from "react-spinners";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import EditFormWrapper from "./EditFormWrapper";
import "react-toastify/dist/ReactToastify.css";

const UpdateDelete = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URI = `https://odd-superstitions.onrender.com/superstition`;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API_URI);
        setData(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteById = async (id) => {
    try {
      setIsLoading(true)
      const res = await axios.delete(`${API_URI}/${id}`);
      if (res.status === 200) {
        toast.success("Superstition Deleted Successfully!", {
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
          navigate("/");
        }, 2000);
      } else {
        throw new Error(
          "Failed to delete superstition. Please try agian later..."
        );
      }
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
    <main
      className={`flex flex-col items-center justify-center mt-4 ${
        isLoading ? "h-[75vh]" : ""
      }`}
    >
      {isLoading && <RotateLoader color="#000000" />}
      {!isLoading &&
        data.map((e) => (
          <div key={e._id} className="flex flex-col items-center m-4">
            <div className="card flex flex-col border-2 border-black rounded-2xl drop-shadow-2xl py-4 lg:px-8 md:px-4 px-3 w-[85vw] md:w-[60vw] ">
              <h2 className="title font-bold text-2xl">{e.title}</h2>
              <p className="description italic text-justify">{e.description}</p>
              <div className="flex justify-around md:w-3/12 mt-[2%]">
                <Link to={`/edit-form/${e._id}`}>
                  <button className="border-2 border-blue-500 rounded px-4 py-1 hover:bg-blue-500 hover:text-white h-fit">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteById(e._id)}
                  className="border-2 border-red-600 rounded px-4 py-1 hover:bg-red-600 hover:text-white h-fit"
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      <Routes>
        <Route path="/edit-form/:id" component={EditFormWrapper} />
      </Routes>
      <ToastContainer />
    </main>
  );
};

export default UpdateDelete;
