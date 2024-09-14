import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './Search.css'; 

function Search() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false); // New loading state
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        setQuery(query); // Save the query for displaying it later
        if (query) {
            fetchFishData(query);
        }
    }, [location.search]);

    const fetchFishData = async (term) => {
        setLoading(true); // Set loading to true when fetching data
        try {
            const response = await axios.get(`http://localhost:8080/fish/name`, {
                params: { name: term }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching fish data:', error);
        } finally {
            setLoading(false); // Set loading to false after the request completes
        }
    };

    return (
        <div>
            <h1>Search Results</h1>
            <div className="fish-container">
                {loading ? (
                    <p></p> // Display loading message or spinner
                ) : results.length > 0 ? (
                    results.map((fish, index) => {
                        const imageUrl = fish.image ? fish.image : 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg';

                        return (
                            <Link to={`/fish/${fish.id}`} key={index} className="fish-card-link">
                                <div className="fish-card">
                                    <img src={imageUrl} alt={fish.commonName} className="fish-image" />
                                    <div className="fish-details">
                                        <h2>{fish.commonName}</h2>
                                        <p><strong>Scientific Name:</strong> {fish.scientificName}</p>
                                        <p><strong>Care Level:</strong> {fish.careLevel}</p>
                                        <p><strong>Average Adult Size:</strong> {fish.averageAdultSize}</p>
                                        <p><strong>Temperature:</strong> {fish.temperature}</p>
                                        <p><strong>pH:</strong> {fish.ph}</p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>No results found for "{query}"</p>
                )}
            </div>
        </div>
    );
}

export default Search;
