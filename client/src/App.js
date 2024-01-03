import logo from "./logo.svg";
import "./App.css";
import UserContextProvider from "./context/user.context";
import Cookies from "js-cookie";

import SignIn from "./pages/auth/signIn";
import SignUp from "./pages/auth/signUp";
import Dashboard from "./pages/dashboard/index";
import UserList from "./pages/user/userList";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {" "}
      <Router>
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
              <Route path="/users" element={<UserList />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          )}
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
