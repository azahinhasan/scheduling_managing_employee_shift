import React,{useContext} from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomPaper from "../../components/paper";
import { FaList } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaClockRotateLeft } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { UserContext } from "../../context/user.context";

const Dashboard = () => {
  const navigate = useNavigate();
  const style={
    border: "4px solid black",
    padding: "5px",
    borderRadius: "2%",
    margin: "5px",
    cursor: "pointer",
  }
  const { permissionCheck } = useContext(UserContext);
  return (
    <div>
      <h1>Dashboard</h1>
      <CustomPaper>
        <Grid container spacing={2}>
          {permissionCheck('user/get_all')&&<Grid item xs={12} md={4}>
            <div
              style={style}
              onClick={() => navigate("/users")}
            >
              <FaList style={{ fontSize: "80px" }} />
              <br />
              All Users
            </div>
          </Grid>}
          <Grid item xs={12} md={4}>
            <div
              style={style}
              onClick={() => navigate("/user-groups")}
            >
              <GrGroup style={{ fontSize: "80px" }} />
              <br />
              User Groups
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
              onClick={() => navigate("/user")}
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
