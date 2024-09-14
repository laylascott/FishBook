import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FishDetails.css';

function FishDetail() {
    const { id } = useParams();
    const [fish, setFish] = useState(null);

    useEffect(() => {
        const fetchFishDetail = async () => {
            try {
                const response = await axios.get('http://localhost:8080/fish/id', {
                    params: { id: id }
                });
                setFish(response.data);
            } catch (error) {
                console.error('Error fetching fish details:', error);
            }
        };

        if (id) {
            fetchFishDetail();
        }
    }, [id]);

    return (
        <div>
            {fish ? (
                <div className="fish-detail-container">
                    <img src={fish.image || 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg'} alt={fish.commonName} className="fish-img" />
                    <div className="fish-info">
                        <h1>{fish.commonName}</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Scientific Name</th>
                                    <td>{fish.scientificName}</td>
                                </tr>
                                <tr>
                                    <th>Care Level</th>
                                    <td>{fish.careLevel}</td>
                                </tr>
                                <tr>
                                    <th>Average Adult Size</th>
                                    <td>{fish.averageAdultSize}</td>
                                </tr>
                                <tr>
                                    <th>Maximum Adult Size</th>
                                    <td>{fish.maximumAdultSize}</td>
                                </tr>
                                <tr>
                                    <th>Lifespan</th>
                                    <td>{fish.lifespan}</td>
                                </tr>
                                <tr>
                                    <th>Temperature</th>
                                    <td>{fish.temperature}</td>
                                </tr>
                                <tr>
                                    <th>Hardness (GH)</th>
                                    <td>{fish.hardnessGH}</td>
                                </tr>
                                <tr>
                                    <th>pH</th>
                                    <td>{fish.ph}</td>
                                </tr>
                                <tr>
                                    <th>Swimming Level</th>
                                    <td>{fish.swimmingLevel}</td>
                                </tr>
                                <tr>
                                    <th>Overall Aggressiveness</th>
                                    <td>{fish.overallAggressiveness}</td>
                                </tr>
                                <tr>
                                    <th>Aggressiveness (Own Species)</th>
                                    <td>{fish.aggressivenessOwnSpecies}</td>
                                </tr>
                                <tr>
                                    <th>Aggressiveness (Other Species)</th>
                                    <td>{fish.aggressivenessOtherSpecies}</td>
                                </tr>
                                <tr>
                                    <th>Ideal Number</th>
                                    <td>{fish.idealNumber}</td>
                                </tr>
                                <tr>
                                    <th>Male-Female Ratio</th>
                                    <td>{fish.mfRatio}</td>
                                </tr>
                                <tr>
                                    <th>Live Plants</th>
                                    <td>{fish.livePlants}</td>
                                </tr>
                                <tr>
                                    <th>Diet Type</th>
                                    <td>{fish.dietType}</td>
                                </tr>
                                <tr>
                                    <th>Food Preferences</th>
                                    <td>{fish.foodPreferences}</td>
                                </tr>
                                <tr>
                                    <th>Substrate</th>
                                    <td>{fish.substrate}</td>
                                </tr>
                                <tr>
                                    <th>Light</th>
                                    <td>{fish.light}</td>
                                </tr>
                                <tr>
                                    <th>Water Current</th>
                                    <td>{fish.waterCurrent}</td>
                                </tr>
                                <tr>
                                    <th>Decorations</th>
                                    <td>{fish.decorations}</td>
                                </tr>
                                <tr>
                                    <th>Minimum Tank Size</th>
                                    <td>{fish.minimumTankSize}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>Loading fish details...</p>
            )}
        </div>
    );
}

export default FishDetail;
