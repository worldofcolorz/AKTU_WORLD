import React from "react";
import { Link } from "react-router-dom";
import "./NavbarFooter.css"; // common style file for Navbar & Footer

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>AKTU WORLD</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/aboutUs">AboutUs</Link>
      </div>
    </nav>
  );
};

export default Navbar;
