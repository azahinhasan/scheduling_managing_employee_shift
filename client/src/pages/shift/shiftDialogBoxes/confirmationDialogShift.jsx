import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
} from "@mui/material";

import { deleteShift } from "../../api-pages";
const ConfirmationDialogShift = ({
  open,
  handleClose,
  currentSelectedShift,
  getAllShiftHandler,
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
  }, [currentSelectedShift]);

  const handleYes = async () => {
    const { _id, ...otherInfo } = currentSelectedShift;
    deleteShift(_id).then(res => {
      console.log(res)
      if (res.success) {
        getAllShiftHandler();
        handleClose();
      } else {
        setMsg({
          text: res.message,
          color: "red",
        });
      }
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        Do you want ot remove this user?
      </DialogTitle>
      <DialogContent>
        Warning: This shift data will be not retrieve again!
        <br />
        <div style={{ color: msg.color }}>{msg.text}</div>
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

export default ConfirmationDialogShift;
