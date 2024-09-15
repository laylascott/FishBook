import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FindEquipment() {
  const [speciesGroups, setSpeciesGroups] = useState([]);
  const [fishData, setFishData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch species groups and corresponding fish data without filtering by tank size
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch species groups
        const speciesResponse = await axios.get('https://fishboot.azurewebsites.net/fish/species-groups');
        const groups = speciesResponse.data;
        setSpeciesGroups(groups);

        // Fetch all fish data without filtering by tank size
        const fishResponse = await axios.get('https://fishboot.azurewebsites.net/fish/all');
        const fish = fishResponse.data;

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
  }, []);

  return (
    <div>
      <h1>Find Equipment</h1>
      <p>Here, you can find the best equipment for your aquarium.</p>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {speciesGroups.map(group => (
            <div key={group} className='species-group-row-container'>
              <h2>{group}</h2>
              <div className='fish-group-row'>
                {fishData[group] && fishData[group].map(fish => (
                  <div className='single-fish-from-group-container'>
                    <p className='fish-name'>{fish.commonName}</p>
                    <img
                      className='fish-thumbnail'
                      src={fish.image || 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg'}
                      alt={fish.commonName}
                    /> </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FindEquipment;
