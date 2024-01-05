import CloseIcon from "@mui/icons-material/Close";

import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  Tooltip,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  Grid,
  Alert,
  MenuItem,
  Slide,
  Typography,
  Toolbar,
  AppBar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import IconButton from "@mui/material/IconButton";
import { createShift, updateShift, modifyEmployeeShift } from "../../api-pages";
import { UserContext } from "../../../context/user.context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeesOfShiftDialog = ({
  currentSelectedShift,
  open,
  handleClose,
  getAllShiftHandler,
  shifts,
  setCurrentSelectedShift,
}) => {
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });
  console.log(currentSelectedShift, "currentSelectedShift");
  const [employeeShifts, setEmployeeShifts] = useState([]);

  useEffect(()=>{},[shifts])

  const deleteHandler = async (id) => {
    //current_shift_id,new_shift_id,employee_id,action_type

    console.log(currentSelectedShift);
    modifyEmployeeShift({current_shift_id:currentSelectedShift._id,employee_id:id,action_type:"remove"}).then((res) => {
      console.log(res);
      if (res.success) {
        getAllShiftHandler();
        handleClose();
        // setcurrentSelectedShift("");
      } else {
        setMsg({
          text: res.message,
          color: "red",
        });
      }
    });
  };

  const showUserShifts = (id) => {
    console.log(shifts)
    setEmployeeShifts(shifts.filter(el=>{
      return el.assigned_employee.find(e=>e._id===id)
    }));
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Employess of this Shift
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <TableContainer style={{border:"1px solid black"}}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Email</b>
                      </TableCell>
                      <TableCell>
                        <b>Phone</b>
                      </TableCell>
                      <TableCell>
                        <b>Options</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentSelectedShift.assigned_employee?.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell>{row.full_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.contact_details?.phone}</TableCell>
                        <TableCell key={row.id}>
                          <Tooltip title="DELETE" placement="left">
                            <DeleteForeverIcon
                              name=""
                              onClick={() => {
                                deleteHandler(row._id);
                              }}
                              style={{ color: "red" }}
                            />
                          </Tooltip>
                          <Tooltip title="SHIFTS" placement="right">
                            <EastIcon
                              name=""
                              onClick={() => {
                                showUserShifts(row._id);
                              }}
                              style={{ color: "blue" }}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* <Grid item xs={12} md={1}></Grid> */}
            <Grid item xs={12} md={4}>
              {employeeShifts.length > 0 && (
                <TableContainer style={{border:"1px solid black"}}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Label</b>
                        </TableCell>
                        <TableCell>
                          <b>Date and Time</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeShifts?.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.label}</TableCell>
                          <TableCell style={{maxWidth:"30px"}}>
                            {new Date(row.date).toDateString()} ( {row.start_time}- {row.end_time})
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeesOfShiftDialog;
