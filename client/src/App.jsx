import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { Route, Routes, useParams } from "react-router-dom";
import Form from "./components/Form";
import UpdateDelete from "./components/UpdateDelete";
import EditFormWrapper from "./components/EditFormWrapper";
import Login from "./components/Login";
import Signup from "./components/Signup";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/update-and-delete/*" element={<UpdateDelete />} />
        <Route path={`/edit-form/:id`} element={<EditFormWrapper />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
