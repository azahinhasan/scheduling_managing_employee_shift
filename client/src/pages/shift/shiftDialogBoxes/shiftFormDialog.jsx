import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import IconButton from "@mui/material/IconButton";
import { createShift, updateShift } from "../../api-pages";

const ShiftFormDialog = ({
  currentSelectedShift,
  open,
  handleClose,
  getAllShiftHandler,
  isCreating,
  setCurrentSelectedShift,
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
  }, [open]);
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const am_pm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutesStr + " " + am_pm;
  };

  const convertToISOTime = (timeString) => {
    if (!timeString) return;
    const today = new Date();
    const [time, am_pm] = timeString.split(" ");
    const [hours, minutes] = time.split(":");

    let hour = parseInt(hours, 10);
    if (am_pm === "PM" && hour !== 12) {
      hour += 12;
    } else if (am_pm === "AM" && hour === 12) {
      hour = 0;
    }
    today.setHours(hour);
    today.setMinutes(parseInt(minutes, 10));
    today.setSeconds(0);
    return today;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isCreating) {
      const { _id, ...otherInfo } = currentSelectedShift;
      updateShift(otherInfo, _id).then((res) => {
        console.log(res);
        if (res.success) {
          getAllShiftHandler();
          handleClose();
          // setCurrentSelectedUser("");
        } else {
          setMsg({
            text: res.message,
            color: "red",
          });
        }
      });
    } else {
      createShift(currentSelectedShift).then((res) => {
        console.log(res);
        if (res.success) {
          getAllShiftHandler();
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

    console.log(currentSelectedShift, "currentSelectedShift");
  };

  function setTimeToMidnight(dateTimeString) {
    let date = new Date(dateTimeString);
    date.setUTCHours(0, 0, 0, 0); // Set to midnight (00:00:00.000) in UTC

    return date.toISOString(); // Converts back to ISO string format
  }

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
        {!isCreating ? "User Shift" : "Create New Shift"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Label"
                variant="outlined"
                margin="normal"
                value={currentSelectedShift?.label}
                onChange={(e) => {
                  setCurrentSelectedShift({
                    ...currentSelectedShift,
                    label: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                label="Label Color"
                variant="outlined"
                margin="normal"
                value={currentSelectedShift?.label_color}
                onChange={(e) => {
                  setCurrentSelectedShift({
                    ...currentSelectedShift,
                    label_color: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM/DD/YYYY"
                  value={new Date(currentSelectedShift?.date)}
                  onChange={(e) =>
                    setCurrentSelectedShift({
                      ...currentSelectedShift,
                      date: new Date(e).setUTCHours(0, 0, 0, 0),
                    })
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      style={{
                        width: "1000px!important",
                        backgroundColor: "black",
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Start Time"
                  value={convertToISOTime(currentSelectedShift.start_time)}
                  onChange={(e) =>
                    setCurrentSelectedShift({
                      ...currentSelectedShift,
                      start_time: formatTime(e),
                    })
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="End Time"
                  value={convertToISOTime(currentSelectedShift.end_time)}
                  onChange={(e) =>
                    setCurrentSelectedShift({
                      ...currentSelectedShift,
                      end_time: formatTime(e),
                    })
                  }
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={12}>
              <Alert variant="outlined" severity="warning">
                - If any other shift have same date,start and end time, user
                will not able to update or cheat shift.
                <br />- Give valid color code or name into Label Color to change
                backgroundColor of Label name.
              </Alert>
            </Grid>

            <Grid item xs={12} md={12}>
              <div style={{ color: msg.color }}>{msg.text}</div>
              <br />
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

export default ShiftFormDialog;
