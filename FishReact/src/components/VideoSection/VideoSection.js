import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoSection.css';

function VideoSection() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/get-started');
  };

  const handleLearnMoreClick = () => {
    window.scrollBy(0, 800); // Adjust this value to control how much the page scrolls down
  };

  return (
    <div className="video-container">
      <video className="background-video" autoPlay loop muted playsInline disablePictureInPicture controls={false}>
        <source src="images/FishHomePage.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <div className="overlay-content">
          <div className="overlay-heading">
            <h1>Your Dream Aquarium <br /> Starts Here.</h1>
          </div>
          <div className="overlay-description">
            <p>Learn how to create the <strong>perfect environment</strong> for your aquatic friends with <strong>personalized recommendations</strong> on equipment and livestock.</p>
          </div>
          <button className="overlay-button" onClick={handleGetStartedClick}>Get Started</button>
        </div>
        <div className="learn-more" onClick={handleLearnMoreClick}>
          Learn More
        </div>
      </div>
    </div>
  );
}

export default VideoSection;
