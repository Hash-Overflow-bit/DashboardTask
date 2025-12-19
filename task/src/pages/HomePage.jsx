import React from "react";
import HomePageImg from "../assets/HomePageImg.png";
import OverlayImg from "../assets/overlay-home-imag.png";
import Orb from "../components/Orb";
import { SiN8N } from "react-icons/si";
import { BsStars } from "react-icons/bs";
import { FaInbox } from "react-icons/fa";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <img src={HomePageImg} alt="Home Page" className="home-page-img" />
      <div className="blur-overlay">
        {/* Hexagon Icons - 3 Left, 3 Right */}
        <div className="hexagon hex-1">
          <SiN8N className="hex-icon" />
          <span className="hex-tooltip">Syncing connectors</span>
        </div>
        <div className="hexagon hex-2">
          <BsStars className="hex-icon" />
          <span className="hex-tooltip">Data is loading</span>
        </div>
        <div className="hexagon hex-3">
          <FaInbox className="hex-icon" />
          <span className="hex-tooltip">Queue processing</span>
        </div>
        <div className="hexagon hex-4">
          <SiN8N className="hex-icon" />
          <span className="hex-tooltip">Cleaning records</span>
        </div>
        <div className="hexagon hex-5">
          <BsStars className="hex-icon" />
          <span className="hex-tooltip">AI enrichment running</span>
        </div>
        <div className="hexagon hex-6">
          <FaInbox className="hex-icon" />
          <span className="hex-tooltip">Export preparing</span>
        </div>

        <div className="content-wrapper">
          <div className="orb-wrapper">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>
          <div className="text-content">
            <h1 className="main-heading">Extract the information</h1>
            <p className="sub-heading">
              We are extracting information from the above honey comb to the
              system
            </p>
          </div>
          <div className="overlay-image-container">
            <img src={OverlayImg} alt="Overlay" className="overlay-image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
