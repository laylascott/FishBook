import React from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import TextField from "@mui/material/TextField";
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm, handleSearchSubmit }) {
  return (
    <div className="nav-search">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for Fish..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img 
            src = "images/icons8-search.svg" 
            alt = "Search Icon" 
            class = "search-icon"/>
        </div> 
      </form>
    </div>
  );
}

export default SearchBar;
