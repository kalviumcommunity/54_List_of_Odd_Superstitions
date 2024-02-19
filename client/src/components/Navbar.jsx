import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavLinks = () => {
    setShowNavLinks(!showNavLinks);
  };

  return (
    <header>
      <nav className="flex h-[10vh]">
        <div className="flex justify-between items-center w-full md:w-full px-4">
          <Link
            to={"/"}
            className="text-[#5b21b6] text-xl font-semibold tracking-wider hover:font-bold hover:text-red-600"
          >
            ODD SUPERSTITIONS
          </Link>
          <button className="lg:hidden px-2 py-1" onClick={toggleNavLinks}>
            ☰
          </button>
        </div>
        <div
          className={`lg:flex md:w-full justify-evenly items-center ${
            showNavLinks ? "block" : "hidden"
          }`}
        >
          <Link to={"/"} className="md:text-lg">
            Home
          </Link>
          <Link to={"/faq"} className="md:text-lg">
            FAQ
          </Link>
          <Link to={"/contact"} className="md:text-lg">
            Contact Us
          </Link>
          <Link to={"/form"} className="md:text-lg">
            Form
          </Link>
          <Link to={"/update-and-delete"} className="md:text-lg">
            Edit
          </Link>
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
