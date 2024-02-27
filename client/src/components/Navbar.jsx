import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <header>
      <nav className="flex h-[10vh] items-center justify-between bg-white px-4">
        <Link
          to={"/"}
          className="text-[#5b21b6] text-xl font-semibold tracking-wider hover:font-bold hover:text-red-600 flex items-center"
        >
          <span>ODD SUPERSTITIONS</span>
        </Link>
        <div className="hidden lg:flex items-center justify-evenly space-x-4 w-[40vw]">
          <Link to={"/"} className="md:text-lg">
            Home
          </Link>
          <Link to={"#"} className="md:text-lg">
            FAQ
          </Link>
          <Link to={"#"} className="md:text-lg">
            Contact Us
          </Link>
          <Link to={"/form"} className="md:text-lg">
            Form
          </Link>
          <Link to={"/update-and-delete"} className="md:text-lg">
            Edit
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button className="px-2 py-1" onClick={toggleNavLinks}>
            ☰
          </button>
        </div>
        <div
          className={`${
            showNavLinks ? "block" : "hidden"
          } lg:hidden w-full bg-white fixed top-[10vh] left-0 h-full border-t-2 border-gray-300 z-10`}
        >
          <Link to={"/"} className="block py-4 px-4 text-lg">
            Home
          </Link>
          <Link to={"#"} className="block py-4 px-4 text-lg">
            FAQ
          </Link>
          <Link to={"#"} className="block py-4 px-4 text-lg">
            Contact Us
          </Link>
          <Link to={"/form"} className="block py-4 px-4 text-lg">
            Form
          </Link>
          <Link to={"/update-and-delete"} className="block py-4 px-4 text-lg">
            Edit
          </Link>
          <div className="flex justify-center items-center space-x-4 mt-auto">
            <Link
              to={"/login"}
              className="border-2 border-black rounded px-4 py-1 hover:bg-black hover:text-white h-fit mt-4"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="border-2 border-black rounded px-4 py-1 hover:bg-black hover:text-white h-fit mt-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            to={"/login"}
            className="border-2 border-black rounded px-4 py-1 hover:bg-black hover:text-white h-fit"
          >
            Login
          </Link>
          <Link
            to={"/signup"}
            className="border-2 border-black rounded px-4 py-1 hover:bg-black hover:text-white h-fit"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
