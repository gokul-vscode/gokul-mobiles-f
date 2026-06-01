// Footer.jsx

import React from "react";
import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer" id="footer">

      {/* TOP SECTION */}

      <div className="footer-top">

        {/* LOGO */}

        <div className="footer-box">

          <h1 className="footer-logo">MobileX</h1>

          <p>
            Discover premium smartphones with futuristic technology,
            flagship performance, and unbeatable prices.
          </p>

          <div className="social-icons">

            <div className="social-box">
              <FaFacebookF />
            </div>

            <div className="social-box">
              <FaInstagram />
            </div>

            <div className="social-box">
              <FaTwitter />
            </div>

            <div className="social-box">
              <FaYoutube />
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}

        <div className="footer-box">

          <h2>Quick Links</h2>

          <ul>
            <li onClick={()=>document.getElementById("banner")?.scrollIntoView({behavior:"smooth"})}>Home</li>
            <li onClick={()=> document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}>Shop</li>
            <li onClick={()=> document.getElementById("footer")?.scrollIntoView({behavior:"smooth"})}>About Us</li>
            <li>Contact</li>
          </ul>

        </div>

        {/* CATEGORIES */}

        <div className="footer-box">

          <h2>Top Brands</h2>

          <ul>
            <li>Apple</li>
            <li>Samsung</li>
            <li>OnePlus</li>
            <li>Xiaomi</li>
          </ul>

        </div>

        {/* CONTACT */}

        <div className="footer-box">

          <h2>Contact</h2>

          <div className="contact-item">
            <FaMapMarkerAlt />
            <span>Sivakasi, Tamil Nadu</span>
          </div>

          <div className="contact-item">
            <FaPhoneAlt />
            <span>+91 6379624525</span>
          </div>

          <div className="contact-item">
            <FaEnvelope />
            <span>ramgokul637@gmail.com</span>
          </div>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        <p>
          © 2026 MobileX. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;