import React from 'react';
import { Link } from 'react-router-dom';
import './LogoAndIcon.css';

function LogoAndIcon() {
  return (
    <div className="nav-logo-and-icon">
      <img src='/images/fishbookicon.png' alt='Logo Icon' className='nav-icon' />
      <Link to="/" className="nav-logo">FishBook</Link>
    </div>
  );
}

export default LogoAndIcon;
