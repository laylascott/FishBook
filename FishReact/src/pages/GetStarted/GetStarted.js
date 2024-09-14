import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import './GetStarted.css';

function GetStarted() {
  return (
    <div className="get-started-container">
      <div className="button-wrapper">
        <CustomButton
          image="/images/community-fish-icon.png"
          side="left"
          title="Already have a tank?"
          text="Find Compatible Fish"
          color="#29ADB2"
          route="/find-fish" 
        />
        <CustomButton
          image="/images/equipment.png"
          side="right"
          title="Already have fish in mind?"
          text="Get Equipment Recommendations"
          color="#C5E898"
          route="/find-equipment" 
        />
      </div>
    </div>
  );
}

export default GetStarted;
