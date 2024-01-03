import React from "react";
import "./navBar.styles.scss";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const logOutHandler = () => {
    Cookies.remove("token");
    navigate("/sign-in");
    window.location.reload();
  };

  return (
    <div className="navBar">
      <ul>
        <li>
          <span onClick={()=>navigate("/dashboard")}>Dashboard</span>
        </li>

        <li
          class="active"
          style={{ float: "right" }}
          onClick={() => logOutHandler()}
        >
          <span>Log Out</span>
        </li>
        <li style={{ float: "right" }}>
          {/* <a>Hi {Cookies.get("name")}</a> */}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
