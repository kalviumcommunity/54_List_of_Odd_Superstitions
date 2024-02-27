import React, { useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUsers] = useState([]);
  const [value, setValue] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/superstition/signup")
      .then((res) => setUsers(res.data));
  }, []);

  return (
    <AppContext.Provider value={{ setUsers, user, value, setValue }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
