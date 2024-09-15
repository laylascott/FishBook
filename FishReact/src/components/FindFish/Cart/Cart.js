import React from 'react';
import './Cart.css';
import { calculateBioLoad } from '../bioloadcalc';

function Cart({ cartItems = [], updateCartItemQuantity, livePlantsRequired, tankSize, handleCheckCompatibility }) {
    const plantFactor = livePlantsRequired ? 0.9 : 1;

    const totalBioLoad = cartItems.reduce((total, item) => {
        return total + calculateBioLoad(item, item.quantity, plantFactor);
    }, 0);

    return (
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

            {tankSize > 0 && cartItems.length > 0 && (
                <div className='total-bio-load'>
                    <h3>Total Bio Load: {totalBioLoad.toFixed(2)}</h3>
                    <h3>Tank Stock Percentage: {(totalBioLoad / tankSize * 100).toFixed(0)}%</h3>

                    {/* Check Compatibility button */}
                    <div className="check-compatibility-container">
                        <button className="check-compatibility-btn" onClick={handleCheckCompatibility}>
                            Check Compatibility
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
