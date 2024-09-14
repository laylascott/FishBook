import React from 'react';
import './SpeciesGroupButton.css';

function SpeciesGroupButton({ group, onClick, isSelected }) {

    const backgroundImageUrl = `${process.env.PUBLIC_URL}/images/${group.replace(" ", '-')}.png`;

    return (
        <button 
            className={`species-group-button ${isSelected ? 'selected' : ''}`} 
            onClick={onClick}
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}  // Set the background image dynamically
        >
            <div class="overlay">
                <p class="overlay-text">{group}</p>
            </div>
        </button>
    );
}

export default SpeciesGroupButton;
