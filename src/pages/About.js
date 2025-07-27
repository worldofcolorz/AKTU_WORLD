import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="main-container">
      <Navbar />
      <div style={{ padding: "2rem", minHeight: "80vh" }}>
        <h1>Notes Page</h1>
        <p>This is where your notes content will go.</p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
