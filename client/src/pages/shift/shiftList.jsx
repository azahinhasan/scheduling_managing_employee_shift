import React, { useEffect, useState } from "react";
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

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import YoutubeSearchedForIcon from "@mui/icons-material/YoutubeSearchedFor";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ConfirmationDialogShift from "./shiftDialogBoxes/confirmationDialogShift";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CustomPaper from "../../components/paper";
import { getAllShift, getUserList } from "../api-pages";
// import UserFormDialog from "./dialogsBoxes/userFormDialog";
// import ConfirmationDialog from "./dialogsBoxes/confirmationDialog";

const ShiftList = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [actionType, setActionType] = useState(false);
  const [filterInfo, setFilterInfo] = useState({
    startDate: new Date(),
    endDate: new Date(),
    employeeName: "",
  });
  const [employees, setEmployees] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [currentSelectedShift, setCurrentSelectedShift] = useState({});

  useEffect(() => {
    getAllShiftHandler();

    getUserList().then((res) => {
      console.log(res);
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
      console.log(res);
      if (res.success) {
        setRows(res.data);
        setFilteredRows(res.data);
      }
    });
  };

  const onClickHandler = (data, action) => {
    if(action==="remove"){
      setOpenConfirmationDialog(true)
      setCurrentSelectedShift(data);
    }
  };

  const handleCloseDialog=()=>{
    setOpenConfirmationDialog(false)
    
  }
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
    console.log(filterInfo);

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

  const convertTo12HourFormat=(time24)=> {
    if(!time24) return "none"
    const [hours24, minutes] = time24.split(':');
    const hours12 = ((parseInt(hours24) + 11) % 12 + 1);
    const ampm = parseInt(hours24) >= 12 ? 'PM' : 'AM';

    return `${hours12}:${minutes} ${ampm}`;
}

  return (
    <div>
      <CustomPaper title="All Shifts">
      <ConfirmationDialogShift
        currentSelectedShift={currentSelectedShift}
        open={openConfirmationDialog}
        handleClose={handleCloseDialog}
        getAllShiftHandler={getAllShiftHandler}
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
          <Grid item xs={12} md={1}>
            <Button
              style={{ height: "55px" }}
              fullWidth
              onClick={() => {
                onClickHandler("", "add");
              }}
              variant="contained"
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Date</b>
                </TableCell>
                <TableCell>
                  <b>Start Time(24h)</b>
                </TableCell>
                <TableCell>
                  <b>End Time(24h)</b>
                </TableCell>
                <TableCell>
                  <b>Employees</b>
                </TableCell>
                <TableCell>
                  <b>Options</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ maxWidth: "70px" }}>
                    {new Date(row.date).toDateString() || "None"}
                  </TableCell>
                  <TableCell style={{ maxWidth: "70px" }}>
                    {(row.start_time)}
                  </TableCell>
                  <TableCell style={{ maxWidth: "70px" }}>
                    {(row.end_time)}
                  </TableCell>
                  <TableCell>
                    List
                  </TableCell>
                  <TableCell>
                    <Tooltip title="EDIT" placement="left">
                      <EditIcon
                        onClick={() => {
                          onClickHandler(row, "edit");
                        }}
                        name=""
                        style={{ color: "#707070" }}
                      />
                    </Tooltip>
                    <Tooltip title="DELETE" placement="right">
                      <DeleteForeverIcon
                        name=""
                        onClick={() => {
                          onClickHandler(row, "remove");
                        }}
                        style={{ color: "#707070" }}
                      />
                    </Tooltip>
                    {/* <Tooltip title="SWITCH ROLE" placement="right">
                      <SwitchRightIcon
                        name=""
                        onClick={() => {
                          onClickHandler(row, "switchRole");
                        }}
                        style={{ color: "#707070" }}
                      />
                    </Tooltip> */}
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
