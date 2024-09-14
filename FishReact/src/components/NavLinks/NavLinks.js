import React from 'react';
import { Link } from 'react-router-dom';
import './NavLinks.css';

function NavLinks({ isNavOpen, isMobileView, searchTerm, setSearchTerm, handleSearchSubmit }) {
  return (
    <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
      {isNavOpen && isMobileView && (
        <div className="small-search-form">
          <input
            type="text"
            placeholder="Search..."
            className="small-search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearchSubmit} className="small-search-button">Go</button>
        </div>
      )}
      <li><Link to="/fishai">FishAi</Link></li>
      <li><Link to="/forDevelopers">For Developers</Link></li>
      <li><Link to="/aboutUs">About Us</Link></li>
    </ul>
  );
}

export default NavLinks;
