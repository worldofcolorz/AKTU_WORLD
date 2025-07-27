import React from "react";
import { Link } from "react-router-dom";
import "./NavbarFooter.css"; // common style file for Navbar & Footer

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>EduZone</h1>
      <div>
        <Link to="/notes">Notes</Link>
        <Link to="/videos">Videos</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
};

export default Navbar;
