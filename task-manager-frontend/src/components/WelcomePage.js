import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css"
import Header from "./Header";

function WelcomePage() {
  return (
    <>
      <Header />
      <section className="main-section">
        <div className="left-part">
          <h3>
            Welcome,<br />
            <span>Feel Free</span> to create your CV now using the best CV Generator Tool!
          </h3>
          <Link to="/cv-builder" className="cta-button">Create CV</Link>
        </div>
        <div className="right-part">
          <img src="/home2.jpg" alt="cv create image" className="home-image" />
        </div>
      </section>
    </>
  );
}

export default WelcomePage;
