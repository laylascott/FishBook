import { useState } from 'react';
import "./CartButtons.css"

const CartButtons = ({ fish, quantities, addToCart, increaseQuantity, decreaseQuantity }) => {
   // State to track which fish button has been clicked
   const [cartAnimation, setCartAnimation] = useState(false);

   const handleAddToCart = (fish) => {
       addToCart({ ...fish, quantity: quantities[fish.id] || 1 });
       setCartAnimation(true);
       setTimeout(() => setCartAnimation(false), 500); // Reset animation after 0.5 seconds
   };
   
   return (
       <div className='cart-buttons'>
           <button onClick={() => handleAddToCart(fish)} className='add-btn'>
               {/* Wrap the text and icon together */}
               <span className="add-to-cart-content">
                   Add to Cart
                   <i className={`cart-icon ${cartAnimation ? 'added' : ''}`}>🛒</i> {/* Cart Icon */}
               </span>
           </button>
           <div className="verticalLine"></div>
           <div className="controls">
               <button onClick={() => decreaseQuantity(fish.id)} className='minus'>-</button>
               <span>{quantities[fish.id] || 1}</span>
               <button onClick={() => increaseQuantity(fish.id)} className='plus'>+</button>
           </div>
       </div>
   );
};

export default CartButtons;
