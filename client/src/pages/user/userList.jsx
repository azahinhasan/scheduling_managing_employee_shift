import React, { useEffect, useState } from "react";
import {
  Paper,
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import CustomPaper from "../../components/paper/Paper";
import { getUserList } from "../api-pages";
import EditUserDialogBox from "./dialogsBoxes/editUser";
const UserList = () => {
  const [rows, setRows] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentSelectedUser, setCurrentSelectedUser] = useState({});
  const [isCreating, setIsCreating] = useState(false);
  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    getUserList().then((res) => {
      console.log(res);
      setRows(res.data);
    });
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const onClickHandler = (type, data) => {
    setOpenEditDialog(type);
    setCurrentSelectedUser(data);
    setIsCreating(data?false:true)
  };

  return (
    <div>
      <EditUserDialogBox
        currentSelectedUser={currentSelectedUser}
        open={openEditDialog}
        setCurrentSelectedUser={setCurrentSelectedUser}
        handleClose={handleCloseEditDialog}
        getAllUser={getAllUser}
        isCreating={isCreating}
      />

      <CustomPaper title="All Users">
        {" "}
       
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} style={{textAlign:"left"}}>
            {/* <h2>All Users</h2> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
             onClick={() => {
              onClickHandler(true);
            }}
              variant="contained"
              style={{ width: "100%", display: "block" }}
            >
              +Add New User
            </Button>
          </Grid>
        </Grid>
         <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.full_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role.role_name}</TableCell>
                <TableCell>
                  <Tooltip title="EDIT" placement="left">
                    <EditIcon
                      onClick={() => {
                        onClickHandler(true, row);
                      }}
                      name=""
                      style={{ color: "#707070" }}
                    />
                  </Tooltip>
                  <Tooltip title="DELETE" placement="bottom">
                    <DeleteForeverIcon name="" style={{ color: "#707070" }} />
                  </Tooltip>
                  <Tooltip title="SWITCH ROLE" placement="right">
                    <SwitchRightIcon name="" style={{ color: "#707070" }} />
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

export default UserList;
