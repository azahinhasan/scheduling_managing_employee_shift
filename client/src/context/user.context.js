import React, { createContext, useState, useEffect } from "react";
import { getAllRoles } from "../pages/api-pages";
export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    getAllRoles().then((res) => {
      if (res.success) {
        setRoles(res.data);
        const temp = res.data.filter((el) => el.permissions.length > 1);
        setPermissions(temp[0].permissions);
      }
    });
  }, []);

  const permissionCheck = (value) => {
    return permissions.includes(value);
  };

  return (
    <UserContext.Provider
      value={{ permissionCheck, roles, setRoles, permissions }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
