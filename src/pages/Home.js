import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

const Card = ({ title, description, image, link }) => (
  <Link to={link} className="card">
    <img src={image} alt={title} />
    <div className="card-content">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </Link>
);

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />

      <div className="cards-container">
        <Card
          title="Notes"
          description="Access well-structured handwritten and PDF notes."
          image="https://source.unsplash.com/featured/?notes,education"
          link="/notes"
        />
        <Card
          title="Videos"
          description="Watch curated video lectures for deep understanding."
          image="https://source.unsplash.com/featured/?videos,onlinelearning"
          link="/videos"
        />
        <Card
          title="About (AKTU)"
          description="Know more about AKTU and affiliated colleges."
          image="https://source.unsplash.com/featured/?university,education"
          link="/about"
        />
        <Card
          title="Papers"
          description="Find previous year question papers and solutions."
          image="https://source.unsplash.com/featured/?exam,paper"
          link="/papers"
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
