import React from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomPaper from "../../components/paper";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { FaList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";

const Dashboard = () => {
  const navigate = useNavigate();
  const style={
    border: "4px solid black",
    padding: "5px",
    borderRadius: "2%",
    margin: "5px",
    cursor: "pointer",
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <CustomPaper style={{ justifyContent: "center", alignItems: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <div
              style={style}
              onClick={() => navigate("/users")}
            >
              <FaList style={{ fontSize: "80px" }} />
              <br />
              All Users
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={style}
              onClick={() => navigate("/users")}
            >
              <GrGroup style={{ fontSize: "80px" }} />
              <br />
              Group Manage
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={style}
              onClick={() => navigate("/users")}
            >
              <FaClockRotateLeft style={{ fontSize: "80px" }} />
              <br />
              All Shifts
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div
              style={style}
              onClick={() => navigate("/users")}
            >
              <CgProfile style={{ fontSize: "80px" }} />
              <br />
              Profile
            </div>
          </Grid>
        </Grid>

        {/* <Button onClick={() => navigate("/sign-in")}>All Shifts</Button>
        <Button onClick={() => navigate("/sign-in")}>Profile</Button> */}
      </CustomPaper>

      {/* <Typography variant="h2">
        <CiViewList />
      </Typography> */}
    </div>
  );
};

export default Dashboard;
