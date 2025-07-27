import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

// Placeholder components for other pages
const Notes = () => (
  <div className="p-6 text-center text-xl">Notes Page Placeholder</div>
);
const Videos = () => (
  <div className="p-6 text-center text-xl">Videos Page Placeholder</div>
);
const About = () => (
  <div className="p-6 text-center text-xl">About Page Placeholder</div>
);
const Papers = () => (
  <div className="p-6 text-center text-xl">Papers Page Placeholder</div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/about" element={<About />} />
        <Route path="/papers" element={<Papers />} />
      </Routes>
    </Router>
  );
}

export default App;
