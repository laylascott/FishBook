import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartButtons from '../../components/FindFish/SpeciesGroupRow/CartButtons';
import './FindEquipment.css';
import { checkCompatibility } from '../FindFish/compatibilityChecker';  // Adjusted import

function FindEquipment() {
  const [speciesGroups, setSpeciesGroups] = useState([]);
  const [fishData, setFishData] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [minTankSize, setMinTankSize] = useState(0);
  const [needHeater, setNeedHeater] = useState(false);
  const [needCirculationPump, setNeedCirculationPump] = useState(false);
  const [livePlantsRecommended, setLivePlantsRecommended] = useState(false);
  const [minFiltration, setMinFiltration] = useState(0); // Filtration capacity

  const [compatibilityResults, setCompatibilityResults] = useState({});
  const [showCompatibility, setShowCompatibility] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const speciesResponse = await axios.get('https://fishboot.azurewebsites.net/fish/species-groups');
        const groups = speciesResponse.data;
        setSpeciesGroups(groups);

        const fishResponse = await axios.get('https://fishboot.azurewebsites.net/fish/all');
        const fish = fishResponse.data;

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

  const addToCart = (fish) => {
    setCartItems((prevCart) => {
      const existingCartItem = prevCart.find(item => item.cartItemId === fish.id);
      if (existingCartItem) {
        return prevCart.map(item =>
          item.cartItemId === fish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const fishWithCartId = { ...fish, cartItemId: fish.id, quantity: 1 };
        return [...prevCart, fishWithCartId];
      }
    });
  };

  const updateCartItemQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    } else {
      setCartItems(prevCart =>
        prevCart.map(item =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleCheckCompatibility = () => {
    const results = checkCompatibility(cartItems, minTankSize);
    setCompatibilityResults(results);
    setShowCompatibility(true);
  };

  const handleCloseCompatibility = () => {
    setShowCompatibility(false);
  };

  useEffect(() => {
    calculateRecommendations();
  }, [cartItems]);

  const calculateRecommendations = () => {
    let totalFiltration = 0;
    let minTankSize = 0;
    let heaterRequired = false;
    let circulationPumpRequired = false;
    let plantsRequired = false;

    cartItems.forEach(item => {
      if (item.minTankSize > minTankSize) {
        minTankSize = item.minTankSize;
      }

      if (item.averageTemp >= 72) {
        heaterRequired = true;
      }

      if (item.waterCurrent === 'Strong') {
        circulationPumpRequired = true;
      }

      if (item.livePlants === 'Yes') {
        plantsRequired = true;
      }

      totalFiltration = item.minTankSize * 5;
    });

    setMinTankSize(minTankSize);
    setNeedHeater(heaterRequired);
    setNeedCirculationPump(circulationPumpRequired);
    setLivePlantsRecommended(plantsRequired);
    setMinFiltration(totalFiltration);
  };

  return (
    <div>
      <div className='row'>
        <div className="cart">
          <h2>Livestock</h2>
          {cartItems.length > 0 ? (
            <div className='cart-grid'>
              {cartItems.map((item, index) => (
                <div key={index} className='cart-grid-item'>
                  <p>{item.commonName}</p>
                  <img className='fish-thumbnail' src={item.image || 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg'} alt={item.commonName} />
                  <div className='cart-buttons'>
                    <div className="controls">
                      <button onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateCartItemQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          ) : (
            <p>Your cart is empty</p>
          )}
          <div className="check-compatibility-container">
            {cartItems.length > 0 && (
              <div className="check-compatibility-container">
                <button className="check-compatibility-btn" onClick={handleCheckCompatibility}>
                  Check Compatibility
                </button>
              </div>
            )}

            {showCompatibility && (
              <div className="modal">
                <div className="modal-content">
                  <h2>Compatibility Check</h2>
                  <p><strong>Temperament:</strong> {compatibilityResults.issues.temperament ? compatibilityResults.issues.temperament : 'All fish are temperamentally compatible'}</p>
                  <p><strong>Diet Compatibility:</strong> {compatibilityResults.issues.diet ? compatibilityResults.issues.diet : 'All fish have compatible diets'}</p>
                  <p><strong>Ideal Number:</strong> {compatibilityResults.issues.idealNumber ? compatibilityResults.issues.idealNumber : 'Ideal numbers are met for all fish'}</p>
                  <p className={`final-message ${compatibilityResults.success ? 'success-text' : 'failure-text'}`}>
                    {compatibilityResults.finalMessage}
                  </p>
                  <button className="close-modal-btn" onClick={handleCloseCompatibility}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="recommendations">
          <h2>Equipment Recommendations</h2>
          <p><strong>Minimum Tank Size:</strong> {minTankSize} gallons</p>
          <p><strong>Filtration Capacity:</strong> {minFiltration} Gallons per Hour (GPH)</p>
          <p><strong>Heater Required:</strong> {needHeater ? 'Yes' : 'No'}</p>
          <p><strong>Circulation Pump Required:</strong> {needCirculationPump ? 'Yes' : 'No'}</p>
          <p><strong>Live Plants Suitable:</strong> {livePlantsRecommended ? 'Yes' : 'No'}</p>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {speciesGroups.map(group => (
            <div key={group} className='species-group-row-container'>
              <h2>{group}</h2>
              <div className='fish-group-row'>
                {fishData[group] && fishData[group].map(fish => (
                  <div key={fish.id} className='single-fish-from-group-container'>
                    <p className='fish-name'>{fish.commonName}</p>
                    <img className='fish-thumbnail' src={fish.image || 'https://franklinchristianchurch.com/wp-content/uploads/2023/01/image-coming-soon.jpeg'} alt={fish.commonName} />
                    <CartButtons
                      fish={fish}
                      quantities={quantities}
                      addToCart={() => addToCart(fish)}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                    />
                  </div>
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
