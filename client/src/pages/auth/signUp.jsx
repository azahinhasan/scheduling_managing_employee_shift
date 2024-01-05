import React, { useState } from "react";
import { signUp } from "../api-pages";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomPaper from "../../components/paper";

const SignUp = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMsg({ text: "", color: "" });
    const { confirm_password, ...otherData } = credentials;

    if (confirm_password !== otherData.password) {
      setMsg({
        text: "Passwords do not match",
        color: "red",
      });
      return;
    }

    if (otherData.contact_details.phone.length>14) {
      setMsg({
        text: "Phone number length should be less then 15",
        color: "red",
      });
      return;
    }

    await signUp(credentials).then((res) => {
      if (res.success) {
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
      <CustomPaper>
        <h2>SIGN UP</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                margin="normal"
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    full_name: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="email"
                required
                label="Email"
                variant="outlined"
                margin="normal"
                onChange={(e) => {
                  setCredentials({ ...credentials, email: e.target.value });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Phone"
                variant="outlined"
                margin="normal"
                type="phone"
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    contact_details: {
                      ...credentials.contact_details,
                      phone: e.target.value,
                    },
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Address"
                variant="outlined"
                margin="normal"
                type="address"
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    contact_details: {
                      ...credentials.contact_details,
                      address: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                onChange={(e) => {
                  setCredentials({ ...credentials, password: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                type="password"
                onChange={(e) => {
                  setCredentials({
                    ...credentials,
                    confirm_password: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <div style={{ color: msg.color }}>{msg.text}</div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                SIGNUP
              </Button>
            </Grid>

            <Grid item xs={12} md={12}>
              Have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </span>
            </Grid>
          </Grid>
        </form>
      </CustomPaper>
    </div>
  );
};

export default SignUp;
