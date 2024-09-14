import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomButton.css';

function CustomButton({ image, side, title, text, color, route }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route); // Navigate to the provided route
  };

  return (
    <div className={`custom-button ${side}`} style={{ backgroundColor: color }} onClick={handleClick}>
      {side === 'left' && <img src={image} alt="Button Icon" className="button-image" />}
      <div className="button-content">
        <span className="button-title">{title}</span>
        <span className="button-text">{text}</span>
      </div>
      {side === 'right' && <img src={image} alt="Button Icon" className="button-image" />}
    </div>
  );
}

export default CustomButton;
