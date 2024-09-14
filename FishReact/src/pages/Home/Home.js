// src/components/Home/Home.js
import React from 'react';
import './Home.css';
import VideoSection from '../../components/VideoSection/VideoSection'; 
import InfoSection from '../../components/InfoSection/InfoSection';

function Home() {
  return (
    <div className="home-container">
      <VideoSection /> 
      <div className="content">
        <InfoSection
          title="Ensure a Balanced Ecosystem"
          description="Already have a tank? We'll help you find fish that will thrive together, creating a harmonious and healthy environment for all your aquatic friends."
          imageSrc="images/fishintank.png"
          isImageLeft={true}  // To align the image on the left side
        />
        <InfoSection
          title="Get the Right Gear"
          description="Know what fish you want? We'll guide you in selecting the perfect equipment to meet their needs, ensuring they live in comfort and health."
          imageSrc="images/fishstore.png"
          isImageLeft={false}  // To align the image on the right side
        />
        <InfoSection
          title="AI-Powered Assistance"
          description="Our intelligent chatbot is here to answer all your fish-related questions, from setup to maintenance, ensuring you’re always equipped with the best advice."
          imageSrc="images/ai.png"
          isImageLeft={true}  // To align the image on the left side
        />
      </div>
    </div>
  );
}

export default Home;
