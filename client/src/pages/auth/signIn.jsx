import React, { useState } from "react";
import { signIn } from "../api-pages";
import { Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignIn = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });

  const handleSubmit = async () => {
    signIn(credentials).then((res) => {
      console.log(res)
      if (res.success) {
        Cookies.set("token", res.token);
        // Cookies.set(
        //   "name",
        //   res.data.first_name + " " + res.data.last_name
        // );
       navigate("/dashboard");
       window.location.reload();
        setMsg({
          text: res.message,
          color: "green",
        });
      } else {
        setMsg({
          text: res.message,
          color: "red",
        });
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Set to 100% of the viewport height
      }}
    >
      <Paper elevation={4} style={{ width: "30%", padding: "20px" }}>
        <h2> SIGN IN</h2>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          onChange={(e) => {
            setCredentials({ ...credentials, email: e.target.value });
          }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          margin="normal"
          type="password"
          onChange={(e) => {
            setCredentials({ ...credentials, password: e.target.value });
          }}
        />
        <br />
        <div style={{ color: msg.color }}>{msg.text}</div>
        <br />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => handleSubmit()}
        >
          LOGIN
        </Button>
        <br /> <br />
        Donn't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/sign-up")}
        >
          Sign Up
        </span>
      </Paper>
    </div>
  );
};

export default SignIn;
