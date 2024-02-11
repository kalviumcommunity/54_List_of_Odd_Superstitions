import React from "react";

const Superstition = () => {
  return (
    <div className="flex flex-col items-center m-8">
      <div className="card flex flex-col border-2 border-black rounded-2xl drop-shadow-2xl py-4 lg:px-8 md:px-4 sm:px-2">
        <h2 className="title font-bold text-2xl">Black Cat Crossings</h2>
        <p className="description italic">
          Crossing paths with a black cat is associated with bad luck, believed
          to be an omen of misfortune or linked to dark magic.
        </p>
      </div>
      <hr />
    </div>
  );
};

export default Superstition;
