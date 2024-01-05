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
import { deleteUser, changeRole } from "../../api-pages";
import { UserContext } from "../../../context/user.context";

const ConfirmationDialog = ({
  open,
  handleClose,
  currentSelectedUser,
  isRemoving,
}) => {
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });

  useEffect(() => {
    setMsg({
      text: "",
      color: "",
    });
  }, [currentSelectedUser]);

  const handleYes = async () => {
    const { _id, ...otherInfo } = currentSelectedUser;
    if (isRemoving) {
      deleteUser(_id).then((res) => {
        if (res.success) {
          handleClose();
        } else {
          setMsg({
            text: res.message,
            color: "red",
          });
        }
      });
    } else {
      changeRole(_id).then((res) => {
        if (res.success) {
         // getAllUser();
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
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {isRemoving
          ? "Do you want ot remove this user?"
          : "Do you want to switch role of this user?"}
      </DialogTitle>
      <DialogContent>
        {isRemoving
          ? "Warning: This user data will be not retrieve again!"
          : "Note: User current role is " +
            currentSelectedUser?.role?.role_name +
            "."}

        <br />
        <br />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {" "}
            <Button
              fullWidth
              onClick={() => {
                handleYes();
              }}
              variant="outlined"
            >
              Yes
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            {" "}
            <Button
              fullWidth
              onClick={() => {
                handleClose();
              }}
              variant="contained"
            >
              No
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
