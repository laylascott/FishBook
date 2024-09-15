import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CartButtons from './CartButtons';
import './SpeciesGroupRow.css';

function SpeciesGroupRow({ addToCart, selectedTankSize, heaterRequired, livePlantsRequired, pumpRequired }) {
    const [speciesGroups, setSpeciesGroups] = useState([]);
    const [filteredFishData, setFilteredFishData] = useState({});
    const [allFishData, setAllFishData] = useState({});
    const [loading, setLoading] = useState(true);
    const [quantities, setQuantities] = useState({});

    // Fetch fish data based on tank size
    useEffect(() => {
        if (selectedTankSize > 0) {
            const fetchAllData = async () => {
                setLoading(true);
                try {
                    const fishResponse = await axios.get('https://fishboot.azurewebsites.net/fish/filter-by-tank-size', {
                        params: { tankSize: selectedTankSize }
                    });
                    const fish = fishResponse.data;

                    const speciesResponse = await axios.get('https://fishboot.azurewebsites.net/fish/species-groups');
                    const groups = speciesResponse.data;
                    setSpeciesGroups(groups);

                    const newFishData = {};
                    groups.forEach(group => {
                        newFishData[group] = fish.filter(f => f.speciesGroup === group);
                    });

                    setAllFishData(newFishData);
                    setFilteredFishData(newFishData);
                } catch (error) {
                    console.error('Error fetching species groups and fish data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchAllData();
        }
    }, [selectedTankSize]);

    // Heater Filter
    const filterByHeater = useCallback((fish) => {
        const avgTemp = fish.averageTemp;
        if (heaterRequired === null || avgTemp === undefined) return true; // No filter applied
        if (heaterRequired && avgTemp < 72) return false; // Needs heater but fish is < 72°F
        if (!heaterRequired && avgTemp >= 72) return false; // No heater but fish is >= 72°F
        return true;
    }, [heaterRequired]);

    // Live Plants Filter
    const filterByLivePlants = useCallback((fish) => {
        if (livePlantsRequired === null) return true; // No filter applied
        const hasLivePlants = fish.livePlants === 'Yes';
        if (livePlantsRequired && !hasLivePlants) return false; // Needs live plants but fish doesn't support it
        //if (!livePlantsRequired && hasLivePlants) return false; // No live plants but fish needs it
        return true;
    }, [livePlantsRequired]);

    // Circulation Pump Filter
    const filterByPump = useCallback((fish) => {
        if (pumpRequired === null) return true; // No filter applied
        const waterCurrent = fish.waterCurrent;
        if (pumpRequired && waterCurrent === 'Low') return false; // Needs pump but fish prefers Low
        if (!pumpRequired && waterCurrent === 'Strong') return false; // No pump but fish prefers Strong
        return true;
    }, [pumpRequired]);

    // Apply all filters
    useEffect(() => {
        const applyAllFilters = () => {
            if (selectedTankSize > 0) {
                const newFilteredFishData = {};

                Object.keys(allFishData).forEach(group => {
                    newFilteredFishData[group] = allFishData[group].filter(fish => {
                        return (
                            filterByHeater(fish) &&
                            filterByLivePlants(fish) &&
                            filterByPump(fish)
                        );
                    });
                });

                setFilteredFishData(newFilteredFishData);
            }
        };

        applyAllFilters();
    }, [heaterRequired, livePlantsRequired, pumpRequired, allFishData, selectedTankSize, filterByHeater, filterByLivePlants, filterByPump]);

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
                                {filteredFishData[groupName] && filteredFishData[groupName].length > 0 ? (
                                    filteredFishData[groupName].map((fish, fishIndex) => (
                                        <div
                                            key={fishIndex}
                                            className='single-fish-from-group-container'>
                                            <p className='fish-name'>{fish.commonName}</p>
                                            <img
                                                className='fish-thumbnail'
                                                src={fish.image || 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg'}
                                                alt={fish.commonName}
                                            />
                                            <CartButtons
                                                fish={fish}
                                                quantities={quantities}
                                                addToCart={addToCart}
                                                increaseQuantity={increaseQuantity}
                                                decreaseQuantity={decreaseQuantity}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <p1>No fish available in {groupName} for the selected conditions.</p1>
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
