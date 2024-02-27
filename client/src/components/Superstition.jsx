import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "./Parentcontext";

const Superstition = () => {
  const [data, setData] = useState([]);
  const { value } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://odd-superstitions.onrender.com/superstition"
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const filteredData = value
    ? data.filter((e) => e.created_by === value)
    : data;

  return (
    <>
      {filteredData.length === 0 ? (
        <h3 className="text-center mt-10 text-2xl font-bold">
          No data available for this user.
        </h3>
      ) : (
        filteredData.map((elem) => (
          <div
            key={elem._id}
            className="flex flex-col items-center mx-4 my-8 lg:m-8"
          >
            <div className="card flex flex-col border-2 border-black rounded-2xl drop-shadow-2xl py-4 lg:px-8 md:px-4 px-3 md:w-3/4 ">
              <h2 className="title font-bold text-2xl">{elem.title}</h2>
              <p className="description italic text-justify">
                {elem.description}
              </p>
            </div>
            <hr />
          </div>
        ))
      )}
    </>
  );
};

export default Superstition;
