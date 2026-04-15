import { useContext, useState } from 'react';
import { CartContext } from '../store/cartContext';
import Button from './button';
import CheckoutModal from './checkoutModal';

const CartModal = ({ isOpen, onClose }) => {
    const cartContext = useContext(CartContext);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    
    if (!isOpen) return null;

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };
    
    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false);
    };

    const handleCancel = () => {
        setIsCheckoutOpen(false);
        onClose();
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            if (isCheckoutOpen) {
                setIsCheckoutOpen(false);
            } else {
                onClose();
            }
        }
    };

    return (
        <>
            <div className="cart-modal-overlay" onClick={handleOverlayClick}>
                <div className="cart-modal">
                    <div className="cart-modal-header">
                        <h2>Your Cart</h2>
                        <button className="close-button" onClick={onClose}>×</button>
                    </div>
                    
                    <div className="cart-modal-content">
                        {cartContext.items.length === 0 ? (
                            <p className="empty-cart">Your cart is empty</p>
                        ) : (
                            <ul className="cart-items">
                                {cartContext.items.map((item) => (
                                    <li key={item.id} className="cart-item">
                                        <div className="cart-item-info">
                                            <h4>{item.name.substring(0, 13)}</h4>
                                            <p className="cart-item-price">${item.price}</p>
                                        </div>
                                        <div className="cart-item-quantity">
                                            <button 
                                                onClick={() => cartContext.decreaseQuantity(item.id)}
                                                className="quantity-btn"
                                            >
                                                -
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button 
                                                onClick={() => cartContext.increaseQuantity(item.id)}
                                                className="quantity-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => cartContext.removeItem(item.id)}
                                            className="remove-item"
                                        >
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    
                    {cartContext.items.length > 0 && (
                        <div className="cart-modal-footer">
                            <div className="cart-total">
                                <h3>Total: ${cartContext.totalAmount.toFixed(2)}</h3>
                            </div>
                            
                            <div className="cart-actions">
                                <div className="modal-actions">
                                    <Button 
                                        content="Cancel" 
                                        className="cancel-button"
                                        onClick={handleCancel}
                                    />
                                    <Button 
                                        content="Proceed to Checkout" 
                                        className="checkout-button"
                                        onClick={handleCheckout}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <CheckoutModal isOpen={isCheckoutOpen} onClose={handleCloseCheckout} />
        </>
    );
};

export default CartModal;
