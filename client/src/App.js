import React,{useContext} from "react";
import "./App.css";
import UserContextProvider from "./context/user.context";
import Cookies from "js-cookie";
import Navbar from "./components/navBar";

import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import Dashboard from "./pages/dashboard/index";
import UserList from "./pages/user/userList";
import UserProfile from "./pages/user/userProfile";
import UserGroups  from "./pages/user/userGroups";
import ShiftList from "./pages/shift/shiftList";
import { UserContext } from "./context/user.context";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
 // const { permissionCheck } = useContext(UserContext);
  return (
    <div className="App">
      <Router>
        {(Cookies.get("token") || !Cookies.get("token") === undefined) && (
          <Navbar />
        )}

        <UserContextProvider>
          {!Cookies.get("token") || Cookies.get("token") === undefined ? (
            <Routes>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              {<Route path="/users" element={<UserList />} />}
              <Route path="/user" element={<UserProfile />} />
              <Route path="/user-groups" element={<UserGroups />} />
              <Route path="/shifts" element={<ShiftList />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          )}
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
