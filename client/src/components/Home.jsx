import React from "react";
import Superstition from "./Superstition";
import "./Home.css";

const Home = () => {
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
      <Superstition />
    </main>
  );
};

export default Home;
