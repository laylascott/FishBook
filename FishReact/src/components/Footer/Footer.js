// src/components/Footer/Footer.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav-links">
        <NavLink to="/" className="footer-link" activeClassName="active">
          Home
        </NavLink>
        <span className="footer-separator">|</span>
        <NavLink to="/browse" className="footer-link" activeClassName="active">
          Browse Fish
        </NavLink>
        <span className="footer-separator">|</span>
        <NavLink to="/get-started" className="footer-link" activeClassName="active">
          Get Started
        </NavLink>
        <span className="footer-separator">|</span>
        <NavLink to="/aboutUs" className="footer-link" activeClassName="active">
          About Us
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
