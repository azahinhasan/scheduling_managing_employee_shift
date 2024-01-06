import React, { useContext } from "react";
import "./App.css";
import UserContextProvider from "./context/user.context";

import AllRoutes from "./pages/all-routes";


function App() {
  // const { permissionCheck } = useContext(UserContext);
  return (
    <div className="App">
      <UserContextProvider>
        <AllRoutes />
      </UserContextProvider>
    </div>
  );
}

export default App;
