import React, { useState } from 'react';
import './InfoButton.css';
import { ReactComponent as InfoIcon } from './info-icon.svg'; 

function InfoButton() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div>
      <button onClick={() => setShowPopup(!showPopup)} className="info-button">
        <InfoIcon className="info-icon" />
      </button>
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <p>It is recommended that your filtration be at least 4X the number of gallons in your aquarium.</p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoButton;
