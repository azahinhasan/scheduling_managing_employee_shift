import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  MenuItem,
} from "@mui/material";
import { tagToSupervisor, updateUser } from "../../api-pages";

const UserGroupDialog = ({
  open,
  handleClose,
  currentSelectedUser,
  isTagging,
  users,
}) => {
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });

  const [requestInfo, setRequestInfo] = useState({
    employee_id: "",
    supervisor_id: "",
  });

  useEffect(() => {
    setMsg({
      text: "",
      color: "",
    });
  }, [open]);

  const handleSubmit = () => {
    console.log(requestInfo);
    if (isTagging) {
      tagToSupervisor(requestInfo).then((res) => {
        console.log(res);
        if (res.success) {
          handleClose();
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
    } else {
      const { active_status, _id, ...other } = currentSelectedUser;
      updateUser({ active_status: !active_status }, _id).then((res) => {
        console.log(res);
        if (res.success) {
          handleClose();
          setMsg({
            text: res.message,
            color: "green",
          });
          handleClose();
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
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
        {isTagging
          ? "Tag Employee to Supervisor"
          : "Do you want to switch active status?"}
      </DialogTitle>
      {isTagging ? (
        <DialogContent fullWidth>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              {" "}
              <TextField
                fullWidth
                label="Employee Name"
                select
                onChange={(e) => {
                  setRequestInfo({
                    ...requestInfo,
                    employee_id: e.target.value,
                  });
                }}
              >
                {users.employees?.map((employee) => {
                  return (
                    <MenuItem value={employee._id}>
                      {employee.full_name} ({employee.email})
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Supervisor Name"
                select
                onChange={(e) => {
                  setRequestInfo({
                    ...requestInfo,
                    supervisor_id: e.target.value,
                  });
                }}
              >
                {users.supervisors?.map((supervisor) => {
                  return (
                    <MenuItem value={supervisor._id}>
                      {supervisor.full_name} ({supervisor.email})
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={12} md={12}>
              <div style={{ color: msg.color }}>{msg.text}</div>
              <br />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleSubmit()}
              >
                SAVE
              </Button>
            </Grid>{" "}
          </Grid>
        </DialogContent>
      ) : (
        <DialogContent>
          <div>
            <b>Note</b>
          </div>
          <div>Employee name is {currentSelectedUser.full_name}</div>
          <div>
            Current status is{" "}
            {currentSelectedUser.active_status ? " Active" : "Not Active"}
          </div>
          <br />

          <div style={{ color: msg.color }}>{msg.text}</div>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              {" "}
              <Button
                fullWidth
                onClick={() => {
                  handleSubmit();
                }}
                variant="outlined"
              >
                Yes
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
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
      )}
    </Dialog>
  );
};

export default UserGroupDialog;
