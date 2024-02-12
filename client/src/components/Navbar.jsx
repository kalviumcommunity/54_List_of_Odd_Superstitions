import React, { useState } from "react";

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <header>
      <nav className="flex h-[10vh]">
        <div className="flex justify-between items-center w-full md:w-full px-4">
          <a
            href="javascript:void(0);"
            className="text-[#5b21b6] text-xl font-semibold tracking-wider hover:font-bold hover:text-red-600"
          >
            ODD SUPERSTITIONS
          </a>
          <button className="lg:hidden px-2 py-1" onClick={toggleNavLinks}>
            ☰
          </button>
        </div>
        <div
          className={`lg:flex md:w-full justify-evenly items-center ${
            showNavLinks ? "block" : "hidden"
          }`}
        >
          <a href="javascript:void(0);" className="md:text-lg">
            Home
          </a>
          <a href="javascript:void(0);" className="md:text-lg">
            About
          </a>
          <a href="javascript:void(0);" className="md:text-lg">
            FAQ
          </a>
          <a href="javascript:void(0);" className="md:text-lg">
            Contact Us
          </a>
          <button className="border-2 border-black rounded px-4 py-1 hover:bg-black hover:text-white h-fit">
            Login
          </button>
          <button className="border-2 border-black rounded px-4 py-1 hover:bg-black hover:text-white h-fit">
            Sign Up
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
