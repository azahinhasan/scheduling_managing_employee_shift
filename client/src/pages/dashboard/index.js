import React from "react";
import { Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Dashboard</h2>
      <Paper>
        <Button onClick={() => navigate("/users")}>All Users</Button>
        <Button   onClick={() => navigate("/sign-in")}>All Shifts</Button>
        <Button   onClick={() => navigate("/sign-in")}>Profile</Button>
      </Paper>
    </div>
  );
};

export default Dashboard;
