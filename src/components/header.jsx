 import { useContext, useState } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './button';
import { CartContext } from '../store/cartContext';
import CartModal from './cartModal';

const Header = () => {
    const cartContext = useContext(CartContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalItems = cartContext.items.reduce((total, item) => total + item.quantity, 0);
    
    const handleCartClick = () => {
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src={logoImg} alt="Logo" />
                    <h1>Menu</h1>
                </div>
                <nav>
                   <Button 
                       onClick={handleCartClick} 
                       content={totalItems > 0 ? <span className='cart-logo'> 🛒<span className="cart-item-count">{totalItems}</span></span> : '🛒'} 
                       className={`cart-button ${totalItems > 0 ? '' : ''}`}
                   />
                </nav>
            </header>
            <CartModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
    );
};

export default Header;