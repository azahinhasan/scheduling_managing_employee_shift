import React, { useState, useEffect, useContext } from "react";
import CustomPaper from "../../components/paper";
import UserGroupDialog from "./dialogsBoxes/userGroupDialog";
import {  getAllGroups, getUserList } from "../api-pages";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";
import {
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
import { UserContext } from "../../context/user.context";

const UserGroups = () => {
  const [groupData, setGroupData] = useState([]);
  const [users, setUsers] = useState({
    supervisors: [],
    employees: [],
  });
  const { permissionCheck } = useContext(UserContext);

  useEffect(() => {
    getAllGroupsHandler();
    getUserList().then((res) => {
      if (res.success) {
        setUsers({
          supervisors: res.data.filter(
            (el) => el.role?.role_name?.toLowerCase() === "supervisor"
          ),
          employees: res.data.filter(
            (el) => el.role?.role_name?.toLowerCase() === "employee"
          ),
        });
      }
    });
  }, []);

  useEffect(() => {}, [groupData]);

  const getAllGroupsHandler = () => {
    getAllGroups().then((res) => {
      if (res.success) {
        setGroupData(res.data);
      }
    });
  };

  const [openDialog, setOpenDialog] = useState(false);
  const [isTagging, setIsTagging] = useState(false);
  const [currentSelectedUser, setCurrentSelectedUser] = useState({});

  const onClickHandler = (data, actionTagging) => {
    setIsTagging(actionTagging);
    setOpenDialog(true);
    setCurrentSelectedUser(!actionTagging ? data : {});
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    getAllGroups();
  };

  return (
    <div>
      <h1>User Groups</h1>
      <CustomPaper>
        <UserGroupDialog
          open={openDialog}
          handleClose={handleCloseDialog}
          currentSelectedUser={currentSelectedUser}
          isTagging={isTagging}
          users={users}
        />

        {permissionCheck(
          "supervisor_employee_relations/tag_employee_to_supervisor"
        ) && (
          <Grid container spacing={1}>
            <Grid item xs={12} md={9} style={{ textAlign: "left" }}>
              {/* <h2>All Users</h2> */}
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                onClick={() => {
                  onClickHandler("", true);
                }}
                variant="contained"
                style={{ height: "55px" }}
              >
                Employee Tag
              </Button>
            </Grid>
          </Grid>
        )}

        {groupData?.map((group) => {
          return (
            <div
              style={{
                border: "2px solid grey",
                margin: "7px 2px",
                padding: "5px",
                borderRadius: "10px",
              }}
            >
              <h3>Supervisor: {group.supervisor_id.full_name}</h3>
              <TableContainer>
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
                    {group.assigned_employees_id.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.full_name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row?.contact_details?.phone}</TableCell>
                        <TableCell>
                          <Tooltip title="CHANGE ACTIVE STATUS" placement="top">
                            <SwitchRightIcon
                              name=""
                              onClick={() => {
                                onClickHandler(row, false);
                              }}
                              style={{ color: "#707070" }}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          );
        })}
      </CustomPaper>
    </div>
  );
};

export default UserGroups;
