import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Videos from "./pages/Videos";
import Papers from "./pages/Papers";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Notes" element={<Notes />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/about" element={<About />} />
        <Route path="/papers" element={<Papers />} />
      </Routes>
    </Router>
  );
}

export default App;
