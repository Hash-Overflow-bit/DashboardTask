import React, { useState } from "react";
import { IoMailOutline, IoMenu, IoClose } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import { TbBinaryTree2 } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("inbox");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMobileMenuOpen(false); // Close menu after clicking a link
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <span className="brand-box">BOX</span>
          <span className="brand-pad">pad</span>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button className="hamburger-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <IoClose /> : <IoMenu />}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <button
            className={`nav-link ${activeLink === "inbox" ? "active" : ""}`}
            onClick={() => handleLinkClick("inbox")}
          >
            <IoMailOutline className="nav-icon" />
            Inbox
          </button>
          <button
            className={`nav-link ${activeLink === "contacts" ? "active" : ""}`}
            onClick={() => handleLinkClick("contacts")}
          >
            <RiContactsBook3Line className="nav-icon" />
            Contacts
          </button>
          <button
            className={`nav-link ${
              activeLink === "ai-employees" ? "active" : ""
            }`}
            onClick={() => handleLinkClick("ai-employees")}
          >
            <GoPeople className="nav-icon" />
            AI Employees
          </button>
          <button
            className={`nav-link ${activeLink === "workflows" ? "active" : ""}`}
            onClick={() => handleLinkClick("workflows")}
          >
            <TbBinaryTree2 className="nav-icon" />
            Workflows
          </button>
          <button
            className={`nav-link ${activeLink === "campaigns" ? "active" : ""}`}
            onClick={() => handleLinkClick("campaigns")}
          >
            <HiOutlineSpeakerphone className="nav-icon" />
            Campaigns
          </button>
        </div>

        {/* Right Side - Settings & Profile */}
        <div className="navbar-right">
          <button className="settings-btn">
            <IoSettingsOutline className="settings-icon" />
          </button>
          <div className="user-profile">
            <div className="user-avatar">M</div>
            <span className="user-name">Micheal Johnson</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
