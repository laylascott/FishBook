import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, setSearchTerm, handleSearchSubmit }) {
  return (
    <div className="nav-search">
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for Fish..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;
