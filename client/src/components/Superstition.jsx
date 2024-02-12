import React, { useEffect, useState } from "react";
import axios from "axios";

const Superstition = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://odd-superstitions.onrender.com/superstition"
        );
        setData(res.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {error ? (
        <div className="flex justify-center items-center">
          <p>Error: {error}</p>
        </div>
      ) : (
        data.map((e) => (
          <div
            key={e._id}
            className="flex flex-col items-center mx-4 my-8 lg:m-8"
          >
            <div className="card flex flex-col border-2 border-black rounded-2xl drop-shadow-2xl py-4 lg:px-8 md:px-4 px-3 md:w-3/4 ">
              <h2 className="title font-bold text-2xl">{e.title}</h2>
              <p className="description italic text-justify">{e.description}</p>
            </div>
            <hr />
          </div>
        ))
      )}
    </>
  );
};

export default Superstition;
