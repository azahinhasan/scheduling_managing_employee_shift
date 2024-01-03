import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { createUser, updateUser } from "../../api-pages";
import { UserContext } from "../../../context/user.context";

const EditUserDialogBox = ({
  open,
  handleClose,
  currentSelectedUser,
  getAllUser,
  setCurrentSelectedUser,
  isCreating,
}) => {
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });

  const { roles } = useContext(UserContext);
 
  useEffect(() => {
    setMsg({
      text: "",
      color: "",
    });
  }, [currentSelectedUser]);

  console.log(currentSelectedUser);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(currentSelectedUser);
    if (!isCreating) {
      const { _id, ...otherInfo } = currentSelectedUser;
      updateUser(otherInfo, _id).then((res) => {
        console.log(res);
        if (res.success) {
          getAllUser();
          handleClose();
         // setCurrentSelectedUser("");
        } else {
          setMsg({
            text: res.message,
            color: "red",
          });
        }
      });
    }else{
      createUser(currentSelectedUser).then((res) => {
        console.log(res);
        if (res.success) {
          getAllUser();
          handleClose();
         // setCurrentSelectedUser("");
        } else {
          setMsg({
            text: res.message,
            color: "red",
          });
        }
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        X
      </IconButton>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {!isCreating ? "User Profile" : "Create New User"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                required
                label="Name"
                variant="outlined"
                margin="normal"
                value={currentSelectedUser?.full_name}
                onChange={(e) => {
                  setCurrentSelectedUser({
                    ...currentSelectedUser,
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
                value={currentSelectedUser?.email}
                onChange={(e) => {
                  setCurrentSelectedUser({
                    ...currentSelectedUser,
                    email: e.target.value,
                  });
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
                value={currentSelectedUser?.contact_details?.phone}
                onChange={(e) => {
                  setCurrentSelectedUser({
                    ...currentSelectedUser,
                    contact_details: {
                      ...currentSelectedUser?.contact_details,
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
                value={currentSelectedUser?.contact_details?.address}
                onChange={(e) => {
                  setCurrentSelectedUser({
                    ...currentSelectedUser,
                    contact_details: {
                      ...currentSelectedUser?.contact_details,
                      address: e.target.value,
                    },
                  });
                }}
              />
            </Grid>

            {isCreating && (
              <Grid item xs={12} md={12}>
                <TextField
                  fullWidth
                  labelId="role-label"
                  // value={currentSelectedUser?.role?.role_name}
                  label="Role"
                  select
                  onChange={(e) => {
                    setCurrentSelectedUser({
                      ...currentSelectedUser,
                      role: e.target.value,
                    });
                  }}
                >
                  {roles?.map((role) => {
                    return (
                      <MenuItem value={role._id}>{role.role_name}</MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            )}

            <Grid item xs={12} md={12}>
              <div style={{ color: msg.color }}>{msg.text}</div>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
              >
                SAVE
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialogBox;
