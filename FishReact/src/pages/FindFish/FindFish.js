import React, { useState, useEffect } from 'react';
import SpeciesGroupRow from '../../components/FindFish/SpeciesGroupRow/SpeciesGroupRow';
import Form from '../../components/FindFish/EquipmentForm/EquipmentForm';
import Cart from '../../components/FindFish/Cart/Cart';
import './FindFish.css';

function FindFish() {
    const [cart, setCart] = useState([]);
    const [mandatoryFieldsFilled, setMandatoryFieldsFilled] = useState(false);
    const [selectedTankSize, setSelectedTankSize] = useState(0); // Track the selected tank size
    const [showMessage, setShowMessage] = useState(true); // Control the message display
    const [showCompatibility, setShowCompatibility] = useState(false); // Control the visibility of the overlay

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

    const removeFromCart = (cartItemId) => {
        setCart((prevCart) => prevCart.filter(item => item.cartItemId !== cartItemId));
    };

    // Show or hide the compatibility overlay
    const handleCheckCompatibility = () => {
        setShowCompatibility(true); // Show the overlay
    };

    const handleCloseCompatibility = () => {
        setShowCompatibility(false); // Hide the overlay
    };

    // Include `cart` in the dependency array to remove the warning
    useEffect(() => {
        console.log('Cart items:', cart);

        // Hide the message after 3 seconds
        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 5000);

        // Clear the timer if the component unmounts
        return () => clearTimeout(timer);
    }, [cart]); // Added `cart` as a dependency

    return (
        <div className='page-wrapper'>
            {/* Fading message */}
            {showMessage && (
                <div className="fade-message">
                    Select Tank Size To Begin
                </div>
            )}

            <div className='row'>
                <Form 
                    onMandatoryFieldsFilled={(filled) => setMandatoryFieldsFilled(filled)} 
                    onTankSizeChange={(size) => setSelectedTankSize(size)} // Pass selected tank size
                    onHeaterChange={setHeaterRequired} // Pass heater selection
                    onLivePlantsChange={setLivePlantsRequired} // Pass live plants selection
                    onPumpChange={setPumpRequired} // Pass pump selection
                />
                <Cart
                    cartItems={cart}
                    updateCartItemQuantity={updateCartItemQuantity}
                    removeFromCart={removeFromCart}
                />
            </div>

            {/* Button to check compatibility */}
            {cart.length > 0 && (
                <div className="check-compatibility-container">
                    <button className="check-compatibility-btn" onClick={handleCheckCompatibility}>
                        Check Compatibility
                    </button>
                </div>
            )}

            {/* Compatibility overlay */}
            {showCompatibility && (
                <div className="compatibility-overlay">
                    <div className="compatibility-content">
                        <h2>Compatibility Results</h2>
                        {/* Here, you would render the compatibility logic based on the fish in the cart */}
                        <p>Displaying compatibility results for your selected fish...</p>
                        {/* Close button */}
                        <button className="close-overlay-btn" onClick={handleCloseCompatibility}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Pass selected tank size and optional filters to SpeciesGroupRow */}
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
