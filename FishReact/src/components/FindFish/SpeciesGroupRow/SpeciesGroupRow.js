import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpeciesGroupRow.css';

function SpeciesGroupRow({ addToCart, selectedTankSize }) {
    const [speciesGroups, setSpeciesGroups] = useState([]);
    const [fishData, setFishData] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        if (selectedTankSize > 0) {
            const fetchAllData = async () => {
                setLoading(true);
                try {
                    // Fetch fish that meet the selected tank size requirement
                    const fishResponse = await axios.get('http://localhost:8080/fish/filter-by-tank-size', {
                        params: { tankSize: selectedTankSize }
                    });
                    const fish = fishResponse.data;

                    const speciesResponse = await axios.get('http://localhost:8080/fish/species-groups');
                    const groups = speciesResponse.data;
                    setSpeciesGroups(groups);

                    // Organize fish data by species group
                    const newFishData = {};
                    groups.forEach(group => {
                        newFishData[group] = fish.filter(f => f.speciesGroup === group);
                    });

                    setFishData(newFishData);
                } catch (error) {
                    console.error('Error fetching species groups and fish data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAllData();
        }
    }, [selectedTankSize]);

    const increaseQuantity = (fishId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [fishId]: (prevQuantities[fishId] || 1) + 1
        }));
    };

    const decreaseQuantity = (fishId) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [fishId]: Math.max((prevQuantities[fishId] || 1) - 1, 1)
        }));
    };

    return (
        <div className='species-group-container'>
            {loading ? (
                <p>Loading species groups and fish data...</p>
            ) : (
                speciesGroups.length > 0 ? (
                    speciesGroups.map((groupName, index) => (
                        <div key={index} className='species-group-row-container'>
                            <h2>{groupName}</h2>
                            <div className='fish-group-row'>
                                {fishData[groupName] && fishData[groupName].length > 0 ? (
                                    fishData[groupName].map((fish, fishIndex) => (
                                        <div
                                            key={fishIndex}
                                            className='single-fish-from-group-container'>
                                            <p className='fish-name'>{fish.commonName}</p>
                                            <img
                                                className='fish-thumbnail'
                                                src={fish.image || 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg'}
                                                alt={fish.commonName}
                                            />
                                            <div className='cart-buttons'>
                                                <button onClick={() => addToCart({ ...fish, quantity: quantities[fish.id] || 1 })} className='add-btn'>
                                                    Add to Cart
                                                </button>
                                                <div className="controls">
                                                    <button onClick={() => decreaseQuantity(fish.id)}>-</button>
                                                    <span>{quantities[fish.id] || 1}</span>
                                                    <button onClick={() => increaseQuantity(fish.id)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p1>{groupName} require a larger tank size.</p1>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No species groups available.</p>
                )
            )}
        </div>
    );
}

export default SpeciesGroupRow;
