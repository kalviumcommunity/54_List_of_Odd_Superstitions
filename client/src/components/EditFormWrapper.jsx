import React from "react";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";

const EditFormWrapper = () => {
  const { id } = useParams();

  return <EditForm id={id} />;
};

export default EditFormWrapper;
