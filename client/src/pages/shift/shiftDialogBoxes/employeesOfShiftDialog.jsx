import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  Tooltip,
  DialogContent,
  Button,
  Grid,
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
  Snackbar,
  Alert,
} from "@mui/material";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";

import EastIcon from "@mui/icons-material/East";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import { modifyEmployeeShift } from "../../api-pages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EmployeesOfShiftDialog = ({
  currentSelectedShift,
  open,
  handleClose,
  getAllShiftHandler,
  shifts,
  employees,
}) => {
  const [msg, setMsg] = useState({
    text: "",
    color: "",
  });

  const [employeeShifts, setEmployeeShifts] = useState([]);
  const [employeesForAdd, setEmployeesForAdd] = useState([]);

  useEffect(() => {
    setEmployeesForAdd([]);
    setEmployeeShifts([]);
    setMsg([]);
  }, [shifts, open]);

  const modifyEmployeeShiftHandler = async (id, type) => {
    //current_shift_id,new_shift_id,employee_id,action_type

    let temp = { current_shift_id: currentSelectedShift._id };
    if (type === "add") {
      temp = { new_shift_id: currentSelectedShift._id };
    }
    modifyEmployeeShift({
      ...temp,
      employee_id: id,
      action_type: type,
    }).then((res) => {
      if (res.success) {
        getAllShiftHandler();
        handleClose();
      } else {
        setMsg({
          text: res.message,
          color: "error",
        });
      }
    });
  };

  const showUserShifts = (id) => {
    setEmployeeShifts(
      shifts.filter((el) => {
        return el.assigned_employee.find((e) => e._id === id);
      })
    );
  };

  const getAllEmployeesHandler = () => {
    setEmployeeShifts([]);
    setEmployeesForAdd(employees);
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
              Employees of this Shift
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              {" "}
              <Button
                style={{ height: "55px" }}
                fullWidth
                variant="contained"
                disabled={employeesForAdd.length > 0}
                onClick={() => getAllEmployeesHandler()}
              >
                <AddIcon /> Add Employee
              </Button>
            </Grid>

            <Grid item xs={12} md={8}>
              <TableContainer style={{ border: "1px solid black" }}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>#</b>
                      </TableCell>
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
                    {employeesForAdd.length > 0
                      ? employeesForAdd?.map((row, i) => (
                          <TableRow key={row._id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{row.full_name}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.contact_details?.phone}</TableCell>
                            <TableCell key={row.id}>
                              <Tooltip title="ADD" placement="left">
                                <BookmarkAddOutlinedIcon
                                  name=""
                                  onClick={() => {
                                    modifyEmployeeShiftHandler(row._id, "add");
                                  }}
                                  style={{ color: "green" }}
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
                        ))
                      : currentSelectedShift.assigned_employee?.map(
                          (row, i) => (
                            <TableRow key={row._id}>
                              <TableCell>{i + 1}</TableCell>
                              <TableCell>{row.full_name}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>
                                {row.contact_details?.phone}
                              </TableCell>
                              <TableCell key={row.id}>
                                <Tooltip title="DELETE" placement="left">
                                  <DeleteForeverIcon
                                    name=""
                                    onClick={() => {
                                      modifyEmployeeShiftHandler(
                                        row._id,
                                        "remove"
                                      );
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
                          )
                        )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {/* <Grid item xs={12} md={1}>
              <Divider orientation="vertical" variant="middle" flexItem />
            </Grid> */}
            <Grid item xs={12} md={4}>
              {employeeShifts.length > 0 ? (
                <TableContainer style={{ border: "1px solid black" }}>
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
                        <TableRow key={row._id}>
                          <TableCell>
                            {row.label}
                            {row._id === currentSelectedShift._id &&
                              " (selected shift)"}
                          </TableCell>
                          <TableCell style={{ maxWidth: "30px" }}>
                            {new Date(row.date).toDateString()} ({" "}
                            {row.start_time}- {row.end_time})
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h2 style={{ textAlign: "center" }}>No shift Data</h2>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Snackbar open={msg.text} autoHideDuration={3000}  onClose={()=>setMsg({...msg,text:""})}>
        <Alert severity={msg.color} sx={{ width: "100%" }}>
          {msg.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EmployeesOfShiftDialog;
