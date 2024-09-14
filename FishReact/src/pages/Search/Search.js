import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import './Search.css';

function Search() {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState(''); // Query from the search bar in the header
    const [loading, setLoading] = useState(false);
    const [noSearchResults, setNoSearchResults] = useState(false); // Track if there are no search results
    const location = useLocation(); // Detects query from the URL

    // Load saved state from sessionStorage when the component loads
    useEffect(() => {
        const savedResults = sessionStorage.getItem('results');
        const savedQuery = sessionStorage.getItem('query');

        if (savedResults) {
            setResults(JSON.parse(savedResults));
        }

        if (savedQuery) {
            setQuery(savedQuery); // Restore query from sessionStorage
        }
    }, []);

    // When the location changes, fetch either by name or species
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchQuery = params.get('query');
        const speciesGroup = params.get('species');

        if (searchQuery) {
            fetchFishDataByName(searchQuery);
            setQuery(searchQuery);
        } else if (speciesGroup) {
            fetchFishDataBySpecies(speciesGroup);
        }
    }, [location.search]);

    // Save results and query to sessionStorage
    useEffect(() => {
        sessionStorage.setItem('results', JSON.stringify(results));
        sessionStorage.setItem('query', query);
    }, [results, query]);

    // Fetch fish by name
    const fetchFishDataByName = async (term) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/fish/name`, {
                params: { name: term }
            });
            const searchData = response.data;
            setResults(searchData); // Set the search results
            setNoSearchResults(searchData.length === 0); // Show no results message if empty
        } catch (error) {
            console.error('Error fetching fish by name:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch fish by species group
    const fetchFishDataBySpecies = async (speciesGroup) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/fish/species`, {
                params: { species: speciesGroup }
            });
            const speciesData = response.data;
            setResults(speciesData); // Set the search results
            setNoSearchResults(speciesData.length === 0); // Show no results message if empty
        } catch (error) {
            console.error('Error fetching fish by species:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Search Results</h1>

            <div className="fish-container">
                {loading ? (
                    <p>Loading...</p>
                ) : results.length > 0 ? (
                    results.map((fish, index) => {
                        const imageUrl = fish.image || 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg';

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
                    noSearchResults && query ? <p>No results found for "{query}"</p> : null
                )}
            </div>
        </div>
    );
}

export default Search;
