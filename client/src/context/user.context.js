import React, { createContext, useState, useEffect } from "react";
import { getAllRoles } from "../pages/api-pages";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [roles, setRoles] = useState([]);

  useEffect(()=>{
    getAllRoles().then(res=>{
      console.log(res)
      setRoles(res.data)
    })
  },[])

  return (
    <UserContext.Provider value={{ roles, setRoles }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
