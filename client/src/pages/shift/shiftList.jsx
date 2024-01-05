import React, { useEffect, useState, useContext } from "react";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Grid,
  Autocomplete,
} from "@mui/material";

import { UserContext } from "../../context/user.context";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ConfirmationDialogShift from "./shiftDialogBoxes/confirmationDialogShift";
import EmployeesOfShiftDialog from "./shiftDialogBoxes/employeesOfShiftDialog";
import ShiftFormDialog from "./shiftDialogBoxes/shiftFormDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import GroupsIcon from "@mui/icons-material/Groups";
import CustomPaper from "../../components/paper";
import { getAllShift, getUserList } from "../api-pages";

const ShiftList = () => {
  const [rows, setRows] = useState([]);
  const { permissionCheck } = useContext(UserContext);
  const [filteredRows, setFilteredRows] = useState([]);
  const [actionType, setActionType] = useState(false);
  const [filterInfo, setFilterInfo] = useState({
    startDate: new Date(),
    endDate: new Date(),
    employeeName: "",
  });
  const [employees, setEmployees] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openEmployeesDialog, setOpenEmployeesDialog] = useState(false);

  const [currentSelectedShift, setCurrentSelectedShift] = useState({});

  useEffect(() => {
    getAllShiftHandler();

    getUserList().then((res) => {
      if (res.success) {
        const temp = res.data.filter(
          (el) => el.role?.role_name?.toLowerCase() === "employee"
        );
        setEmployees(temp);
      }
    });
  }, []);

  const getAllShiftHandler = () => {
    getAllShift().then((res) => {
      if (res.success) {
        setRows(res.data);
        setFilteredRows(res.data);
      }
    });
  };

  const onClickHandler = (data, action) => {
    setCurrentSelectedShift(data);
    setActionType(action);
    if (action === "remove") {
      setOpenConfirmationDialog(true);
      setOpenFormDialog(false);
    } else if (["create", "edit"].includes(action)) {
      setOpenFormDialog(true);
      setOpenConfirmationDialog(false);
    } else if (action === "employees") {
      setOpenEmployeesDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenConfirmationDialog(false);
    setOpenFormDialog(false);
    setOpenEmployeesDialog(false);
  };
  const filterHandler = (type) => {
    if (type === "reset") {
      setFilterInfo({
        startDate: new Date(),
        endDate: new Date(),
        employeeName: "",
      });
      setFilteredRows(rows);
      return;
    }

    const filteredData = rows.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        (itemDate >= filterInfo.startDate && itemDate <= filterInfo.endDate) ||
        item.assigned_employee.find(
          (el) => el.full_name === filterInfo.employeeName
        )
      );
    });
    setFilteredRows(filteredData);
  };

  return (
    <div>
      <CustomPaper title="All Shifts">
        <ConfirmationDialogShift
          currentSelectedShift={currentSelectedShift}
          open={openConfirmationDialog}
          handleClose={handleCloseDialog}
          getAllShiftHandler={getAllShiftHandler}
        />

        <ShiftFormDialog
          currentSelectedShift={currentSelectedShift}
          open={openFormDialog}
          handleClose={handleCloseDialog}
          getAllShiftHandler={getAllShiftHandler}
          isCreating={actionType === "create" ? true : false}
          setCurrentSelectedShift={setCurrentSelectedShift}
        />

        <EmployeesOfShiftDialog
          currentSelectedShift={currentSelectedShift}
          open={openEmployeesDialog}
          handleClose={handleCloseDialog}
          getAllShiftHandler={getAllShiftHandler}
          shifts={rows}
          setCurrentSelectedShift={setCurrentSelectedShift}
        />

        <Grid container spacing={1}>
          <Grid item xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start Date"
                inputFormat="MM/DD/YYYY"
                value={filterInfo?.startDate}
                onChange={(e) => setFilterInfo({ ...filterInfo, startDate: e })}
                renderInput={(params) => <TextField {...params} />}
                maxDate={filterInfo?.endDate}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                fullWidth
                label="End Date"
                inputFormat="MM/DD/YYYY"
                value={filterInfo?.endDate}
                onChange={(e) => setFilterInfo({ ...filterInfo, endDate: e })}
                renderInput={(params) => <TextField {...params} />}
                minDate={filterInfo?.startDate}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={3}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={filterInfo.employeeName}
              options={employees.map((el) => el.full_name)}
              renderInput={(params) => (
                <TextField {...params} label="Employee" />
              )}
              onChange={(_, value) => {
                setFilterInfo({ ...filterInfo, employeeName: value });
              }}
            />
          </Grid>
          <Grid item xs={6} md={1}>
            <Button
              style={{ height: "55px" }}
              fullWidth
              onClick={() => {
                filterHandler("filter");
              }}
              variant="contained"
            >
              <SearchIcon />
            </Button>
          </Grid>
          <Grid item xs={6} md={1}>
            <Button
              fullWidth
              style={{ height: "55px" }}
              onClick={() => {
                filterHandler("reset");
              }}
              variant="contained"
            >
              <YoutubeSearchedForIcon />
            </Button>
          </Grid>
          {permissionCheck("shift/create") && (
            <Grid item xs={12} md={1}>
              <Button
                style={{ height: "55px" }}
                fullWidth
                onClick={() => {
                  onClickHandler(
                    {
                      end_time: "12:00 PM",
                      start_time: "12:00 PM",
                      date: new Date().setUTCHours(0, 0, 0, 0),
                      label_color: "",
                      label: "",
                      assigned_employee: [],
                    },
                    "create"
                  );
                }}
                variant="contained"
              >
                <AddIcon />
              </Button>
            </Grid>
          )}
        </Grid>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Label</b>
                </TableCell>
                <TableCell>
                  <b>Date</b>
                </TableCell>
                <TableCell>
                  <b>Start Time</b>
                </TableCell>
                <TableCell>
                  <b>End Time</b>
                </TableCell>
                <TableCell>
                  <b>Options</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row._id}>
                  <TableCell
                    style={{
                      maxWidth: "70px",
                      backgroundColor: row.label_color || "white",
                    }}
                  >
                    {row.label || "noe"}
                  </TableCell>
                  <TableCell style={{ maxWidth: "70px" }}>
                    {new Date(row.date).toDateString() || "None"}
                  </TableCell>
                  <TableCell style={{ maxWidth: "70px" }}>
                    {row.start_time}
                  </TableCell>
                  <TableCell style={{ maxWidth: "70px" }}>
                    {row.end_time}
                  </TableCell>
                  <TableCell>
                    {(
                      <>
                        <Tooltip title="EDIT" placement="left">
                          <EditIcon
                            onClick={() => {
                              onClickHandler(row, "edit");
                            }}
                            name=""
                            style={{ color: "blue" }}
                          />
                        </Tooltip>
                        <Tooltip title="DELETE" placement="bottom">
                          <DeleteForeverIcon
                            name=""
                            onClick={() => {
                              onClickHandler(row, "remove");
                            }}
                            style={{ color: "red" }}
                          />
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title="Employees" placement="right">
                      <GroupsIcon
                        name=""
                        onClick={() => {
                          onClickHandler(row, "employees");
                        }}
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CustomPaper>
    </div>
  );
};

export default ShiftList;
