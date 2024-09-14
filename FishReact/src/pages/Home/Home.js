import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="video-container">
                <video className="background-video" autoPlay loop muted>
                    <source src="images/FishHomePage.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="video-overlay"></div> {/* Blue transparent overlay */}
                <div className="overlay-content">
                    <h1>Your Dream Aquarium Starts Here.</h1>
                    <p>Learn how to create the perfect environment for your aquatic friends with personalized recommendations on equipment and livestock.</p>
                    <button className="overlay-button">Get Started</button>
                </div>
            </div>
            <div className="content">
                Home page
            </div>
        </div>
    );
}

export default Home;
