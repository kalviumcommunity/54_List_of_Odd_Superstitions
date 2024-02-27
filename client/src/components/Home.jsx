import React, { useContext } from "react";
import Superstition from "./Superstition";
import "./Home.css";
import { AppContext } from "./Parentcontext";

const Home = () => {
  const { user, setValue } = useContext(AppContext);

  return (
    <main>
      <div className="hero flex justify-center items-center px-[5%] h-[40vh] lg:h-[50vh]">
        <div className="justify-center">
          <h2 className="text-2xl lg:text-3xl font-bold ">
            Opening Presents Early
          </h2>
          <p className="my-8 italic font-medium text-justify text-xs lg:text-base">
            Opening gifts before the designated time is considered bad luck,
            disrupting the positive energy associated with the surprise.
          </p>
        </div>
      </div>
      <div className="flex justify-end pt-5 max-w-[85vw]">
        <select
          className="select select-bordered"
          onChange={(e) => {
            setValue(e.target.value);
          }}
        >
          <option value="">All</option>
          {user.map((e) => (
            <option key={e._id} value={e.username}>
              {e.username}
            </option>
          ))}
        </select>
      </div>
      <Superstition />
    </main>
  );
};

export default Home;
