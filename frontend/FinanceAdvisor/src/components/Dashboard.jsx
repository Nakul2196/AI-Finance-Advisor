// components/Dashboard.jsx
import React from "react";
import Content from "./Content";
import Profile from "./Profile";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Content />
      <Profile />
    </div>
  );
};

export default Dashboard;