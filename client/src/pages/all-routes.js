import React, { useContext } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/navBar";

import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";
import Dashboard from "./dashboard/index";
import UserList from "./user/userList";
import UserProfile from "./user/userProfile";
import UserGroups from "./user/userGroups";
import ShiftList from "./shift/shiftList";

import { UserContext } from "../context/user.context";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const AllRoutes = () => {
  const { permissionCheck } = useContext(UserContext);
  return (
    <Router>
      {(Cookies.get("token") || !Cookies.get("token") === undefined) && (
        <Navbar />
      )}
      {!Cookies.get("token") || Cookies.get("token") === undefined ? (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {permissionCheck('user/get-all-in-table')&&<Route path="/users" element={<UserList />} />}
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user-groups" element={<UserGroups />} />
          <Route path="/shifts" element={<ShiftList />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      )}
    </Router>
  );
};

export default AllRoutes;
