import React, { useState, useEffect } from 'react';
import SpeciesGroupRow from '../../components/FindFish/SpeciesGroupRow/SpeciesGroupRow';
import Form from '../../components/FindFish/EquipmentForm/EquipmentForm';
import Cart from '../../components/FindFish/Cart/Cart';
import './FindFish.css';
import { checkCompatibility } from './compatibilityChecker'; // Import the compatibility checker

function FindFish() {
    const [cart, setCart] = useState([]);
    const [mandatoryFieldsFilled, setMandatoryFieldsFilled] = useState(false);
    const [selectedTankSize, setSelectedTankSize] = useState(0);
    const [showMessage, setShowMessage] = useState(true);
    const [showCompatibility, setShowCompatibility] = useState(false);
    const [compatibilityResults, setCompatibilityResults] = useState(null);

    // Optional Fields State
    const [heaterRequired, setHeaterRequired] = useState(null);
    const [livePlantsRequired, setLivePlantsRequired] = useState(null);
    const [pumpRequired, setPumpRequired] = useState(null);

    const addToCart = (fish) => {
        setCart((prevCart) => {
            const existingCartItem = prevCart.find(item => item.cartItemId === fish.id);
            if (existingCartItem) {
                return prevCart.map(item =>
                    item.cartItemId === fish.id
                        ? { ...item, quantity: item.quantity + fish.quantity }
                        : item
                );
            } else {
                const fishWithCartId = { ...fish, cartItemId: fish.id };
                return [...prevCart, fishWithCartId];
            }
        });
    };

    const updateCartItemQuantity = (cartItemId, newQuantity) => {
        setCart((prevCart) =>
            prevCart
                .map(item =>
                    item.cartItemId === cartItemId
                        ? { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }
                        : item
                )
                .filter(item => newQuantity > 0 || item.cartItemId !== cartItemId)
        );
    };

    const handleCheckCompatibility = () => {
        const results = checkCompatibility(cart, selectedTankSize); // Call the compatibility checker
        setCompatibilityResults(results); // Store the results
        setShowCompatibility(true); // Show the overlay
    };

    const handleCloseCompatibility = () => {
        setShowCompatibility(false); // Hide the overlay
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [cart]);

    return (
        <div className='page-wrapper'>
            {showMessage && (
                <div className="fade-message">
                    Select Tank Size To Begin
                </div>
            )}

            <div className='row'>
                <Form
                    onMandatoryFieldsFilled={(filled) => setMandatoryFieldsFilled(filled)}
                    onTankSizeChange={(size) => setSelectedTankSize(size)}
                    onHeaterChange={setHeaterRequired}
                    onLivePlantsChange={setLivePlantsRequired}
                    onPumpChange={setPumpRequired}
                />
                <Cart
                    cartItems={cart}
                    updateCartItemQuantity={updateCartItemQuantity}
                    livePlantsRequired={livePlantsRequired}
                    tankSize={selectedTankSize}
                    handleCheckCompatibility={handleCheckCompatibility}
                />
            </div>

            {showCompatibility && (
                <div className="compatibility-overlay">
                    <div className="compatibility-content">
                        <h2>Compatibility Results</h2>
                        {compatibilityResults ? (
                            <div>
                                <p><strong>Water Changes:</strong> {compatibilityResults.issues.waterChanges}</p>
                                <p><strong>Temperament:</strong> {compatibilityResults.issues.temperament ? compatibilityResults.issues.temperament : 'All fish are temperamentally compatible'}</p>
                                <p><strong>Diet Compatibility:</strong> {compatibilityResults.issues.diet ? compatibilityResults.issues.diet : 'All fish have compatible diets'}</p>
                                <p><strong>Ideal Number:</strong> {compatibilityResults.issues.idealNumber ? compatibilityResults.issues.idealNumber : 'Ideal numbers are met for all fish'}</p>
                                
                                {/* Display the final message with conditional text color */}
                                <p
                                    className={`final-message ${compatibilityResults.success ? 'success-text' : 'failure-text'}`}
                                >
                                    {compatibilityResults.finalMessage}
                                </p>
                            </div>
                        ) : (
                            <p>Calculating compatibility...</p>
                        )}
                        <button className="close-overlay-btn" onClick={handleCloseCompatibility}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {mandatoryFieldsFilled &&
                <SpeciesGroupRow
                    addToCart={addToCart}
                    selectedTankSize={selectedTankSize}
                    heaterRequired={heaterRequired}
                    livePlantsRequired={livePlantsRequired}
                    pumpRequired={pumpRequired}
                />
            }
        </div>
    );
}

export default FindFish;
