import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import LogoAndIcon from '../LogoAndIcon/LogoAndIcon';
import SearchBar from '../SearchBar/SearchBar';
import NavLinks from '../NavLinks/NavLinks';
import Hamburger from '../Hamburger/Hamburger';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 500);
  const navigate = useNavigate();

  // Move handleResize function inside useEffect to avoid dependency issues
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 500);
      if (window.innerWidth > 500 && isNavOpen) {
        setIsNavOpen(false); // Ensure the hamburger menu is closed when screen is large
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
        />
      </nav>
    </header>
  );
}

export default Header;
