import SpeciesGroupButton from '../../components/SpeciesGroupButton/SpeciesGroupButton';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Browse.css';

function Browse() {
    const [speciesGroups, setSpeciesGroups] = useState([]);
    const navigate = useNavigate(); // For navigation

    // Fetch species groups when the page loads
    const fetchSpeciesGroups = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/fish/species-groups`);
            setSpeciesGroups(response.data); // Set the species groups
        } catch (error) {
            console.error('Error fetching species groups:', error);
        }
    };

    useEffect(() => {
        fetchSpeciesGroups();
    }, []);

    // Handle species group click to navigate to the Search page
    const handleSpeciesGroupClick = (group) => {
        navigate(`/search?species=${group}`);
    };

    return (
        <div className="species-group-buttons">
            {speciesGroups.length > 0 ? (
                speciesGroups.map((group, index) => (
                    <SpeciesGroupButton
                        key={index}
                        group={group}
                        onClick={() => handleSpeciesGroupClick(group)} // Trigger navigation on click
                    />
                ))
            ) : (
                <p>Loading species groups...</p>
            )}
        </div>
    );
}

export default Browse;
