import React from 'react';
import './Cart.css';

function Cart({ cartItems = [], updateCartItemQuantity, removeFromCart }) {
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

        </div>
    );
}

export default Cart;
