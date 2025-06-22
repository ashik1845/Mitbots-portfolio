import React from "react";
import "../styles/Footer.css";
import emailIcon from "../assets/email.png";
import whatsappIcon from "../assets/whatsapp.png";
import linkedinIcon from "../assets/linkedin.png";
import instagramIcon from "../assets/instagram.png";

const Footer = () => {
  return (
    <div data-cursor-bg="dark" className="footer-section ">
      <div className="footer-content">
        <div className="footer-curve-layer">
          <h1 className="footer-heading">
            Code Fades. <span className="highlight">Ideas Evolve</span>. But Impact Stays.
          </h1>

          <div className="footer-icons">
            <img src={emailIcon} alt="Email" />
            <img src={whatsappIcon} alt="Whatsapp" />
            <img src={linkedinIcon} alt="LinkedIn" />
            <img src={instagramIcon} alt="Instagram" />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <hr className="footer-divider" />
        <p className="footer-copy">Designed and Developed by Mitbots 2025.</p>
      </div>
    </div>
  );
};

export default Footer;
