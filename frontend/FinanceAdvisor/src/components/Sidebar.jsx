import React from "react";
import {
  BiHome,
  BiBookAlt,
  BiMessage,
  BiSolidReport,
  BiStats,
  BiTask,
  BiHelpCircle,
} from "react-icons/bi";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <BiBookAlt className="logo-icon" />
        <h2>Nakul</h2>
      </div>
      <nav className="menu--list">
        <NavLink to="/" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <BiHome className="icon" />
          Dashboard
        </NavLink>
        <NavLink to="/portfolio" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <BiTask className="icon" />
          Portfolio
        </NavLink>
        <NavLink to="/Advisor" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <BiSolidReport className="icon" />
          AI Advisor
        </NavLink>
        <NavLink to="/news" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <BiMessage className="icon" />
          News
        </NavLink>
        <NavLink to="/analytics" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <BiStats className="icon" />
          Analytics
        </NavLink>
        <NavLink to="/help" className={({ isActive }) => (isActive ? "item active" : "item")}>
          <BiHelpCircle className="icon" />
          Help
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;