import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import LogoAndIcon from './LogoAndIcon/LogoAndIcon';
import SearchBar from './SearchBar/SearchBar';
import NavLinks from './NavLinks/NavLinks';
import Hamburger from './Hamburger/Hamburger';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 500);
  const navigate = useNavigate();
  const location = useLocation(); // Detects changes in location

  // Clear the search term only when navigating away from the search page
  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchTerm(''); // Clear the search term when not on the search page
    }
  }, [location.pathname]); // Triggered whenever the route changes

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 500);
      if (window.innerWidth > 500 && isNavOpen) {
        setIsNavOpen(false); // Ensure the hamburger menu is closed when the screen is large
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [isNavOpen]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${searchTerm}`);
      setIsNavOpen(false);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  // Close the menu
  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <LogoAndIcon />
        {!isMobileView && (
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchSubmit={handleSearchSubmit}
          />
        )}
        <Hamburger toggleNav={toggleNav} />
        <NavLinks
          isNavOpen={isNavOpen}
          isMobileView={isMobileView}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearchSubmit={handleSearchSubmit}
          closeNav={closeNav} // Pass the closeNav function
        />
      </nav>
    </header>
  );
}

export default Header;
