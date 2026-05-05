import { useState, useContext } from 'react';
import { CartContext } from '../store/cartContext';
import Button from './button';

const CheckoutModal = ({ isOpen, onClose }) => {
    const cartContext = useContext(CartContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        city: '',
        'postal-code': '',
        street: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!formData.email.includes('@')) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (!formData.street.trim()) {
            newErrors.street = 'Street is required';
        }
        
        if (!formData.city.trim()) {
            newErrors.city = 'City is required';
        }
        
        if (!formData['postal-code'].trim()) {
            newErrors['postal-code'] = 'Postal code is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setSubmitStatus(null);
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        const orderData = {
            customer: formData,
            items: cartContext.items,
            totalAmount: cartContext.totalAmount
        };

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ order: orderData })
            });

            if (response.ok) {
                setSubmitStatus('success');
                // Clear cart after successful order
                cartContext.items.forEach(item => {
                    cartContext.removeItem(item.id);
                });
                
                // Close modal after success delay
                setTimeout(() => {
                    onClose();
                    setSubmitStatus(null);
                }, 2000);
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    city: '',
                    'postal-code': '',
                    street: ''
                });
            } else {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus(null), 3000);
            }
        } catch (error) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="checkout-modal-overlay" onClick={handleOverlayClick}>
            <div className="checkout-modal">
                <div className="checkout-modal-header">
                    <h2>Checkout</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                
                <div className="checkout-modal-content">
                    {submitStatus && (
                        <div className={`status-message ${submitStatus}`}>
                            {submitStatus === 'success' ? (
                                <>
                                    <span className="status-icon">×</span>
                                    Order placed successfully! Your cart has been cleared.
                                </>
                            ) : (
                                <>
                                    <span className="status-icon">!</span>
                                    Failed to place order. Please try again.
                                </>
                            )}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.name && <span className="error-message">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input
                                type="text"
                                id="street"
                                name="street"
                                value={formData.street}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.street && <span className="error-message">{errors.street}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="postal-code">Postal Code</label>
                            <input
                                type="text"
                                id="postal-code"
                                name="postal-code"
                                value={formData['postal-code']}
                                onChange={handleInputChange}
                                required
                            />
                            {errors['postal-code'] && <span className="error-message">{errors['postal-code']}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.city && <span className="error-message">{errors.city}</span>}
                        </div>

                        <div className="order-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-items">
                                {cartContext.items.map((item) => (
                                    <div key={item.id} className="summary-item">
                                        <span>{item.name} x {item.quantity}</span>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-total">
                                <strong>Total: ${cartContext.totalAmount.toFixed(2)}</strong>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="checkout-modal-footer">
                    <div className="form-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                        >
                            {isSubmitting ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
