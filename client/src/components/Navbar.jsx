import React from "react";

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between px-10 py-4">
        <div className="flex justify-evenly w-2/4">
          <a
            href="javascript:void(0);"
            className="text-[#5b21b6] text-xl font-semibold tracking-wider hover:font-bold hover:text-red-600"
          >
            ODD SUPERSTITIONS
          </a>
          <a href="javascript:void(0);" className="text-lg">
            Home
          </a>
          <a href="javascript:void(0);" className="text-lg">
            About
          </a>
          <a href="javascript:void(0);" className="text-lg">
            FAQ
          </a>
          <a href="javascript:void(0);" className="text-lg">
            Contact Us
          </a>
        </div>
        <div className="flex justify-evenly w-1/6">
          <button className="border-2 border-black rounded px-4 py-1 min-h-full hover:bg-black hover:text-white">
            Login
          </button>
          <button className="border-2 border-black rounded px-4 py-1 hover:bg-black hover:text-white">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
