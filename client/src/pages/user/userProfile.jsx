import React, { useState, useEffect } from "react";
import CustomPaper from "../../components/paper";
import { updateUser, getUserInfoById } from "../api-pages";
import { Grid, Paper, TextField, Button } from "@mui/material";

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });
  useEffect(() => {
    getUserInfoById().then((res) => {
      if (res.success) {
        setUserData(res.data);
      }
    });
    setMsg({ text: "", color: "" });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { _id, ...otherInfo } = userData;
    updateUser(otherInfo, _id).then((res) => {
      console.log(res);
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
    <div>
      <h1>User Profile</h1>
      <CustomPaper>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                margin="normal"
                value={String(userData?.full_name)}
                onChange={(e) => {
                  setUserData({
                    ...userData,
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
                value={String(userData?.email)}
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
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
                value={String(userData?.contact_details?.phone || "")}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    contact_details: {
                      ...userData.contact_details,
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
                value={String(userData?.contact_details?.address || "")}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    contact_details: {
                      ...userData.contact_details,
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
                label="Role"
                variant="outlined"
                margin="normal"
                disabled
                value={String(userData?.role?.role_name)}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <div style={{ color: msg.color }}>{msg.text}</div>
              <br />
              <Button
                variant="contained"
                color="primary"
                
                type="submit"
              >
                UPDATE
              </Button>
            </Grid>
          </Grid>
        </form>
      </CustomPaper>
    </div>
  );
};

export default UserProfile;
