import logo from "./logo.svg";
import "./App.css";
import UserContextProvider from "./context/user.context";

import SignIn  from "./pages/auth/signIn";
import Cookies from "js-cookie";
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
        {(Cookies.get("token") || !Cookies.get("token") === undefined)}
            {!Cookies.get("token") || Cookies.get("token") === undefined ? (
              <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                {/* <Route path="/sign-up" element={<SignUp />} /> */}
                <Route path="*" element={<Navigate to="/sign-in" />} />
              </Routes>
            ) : (
              <Routes>
                {/* <Route path="/my-products" element={<MyProducts />} />
                <Route path="/my-product/:id" element={<EditProduct />} /> */}
                <Route path="*" element={<Navigate to="/my-products" />} />
              </Routes>
            )}
        </UserContextProvider>
      </Router>
    </div>
  );
}

export default App;
