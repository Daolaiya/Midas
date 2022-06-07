import React from "react";
import {NavLink } from "react-router-dom";
import "./NavBar.css";

function ResourceNavBar() {
  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Home
      </NavLink>
      <NavLink exact to="/companies">
        Companies
      </NavLink>
      <NavLink exact to="/jobs">
        Jobs
      </NavLink>
      <NavLink exact to="/applications">
        Applications
      </NavLink>
    </nav>
  );
}

export default ResourceNavBar;
