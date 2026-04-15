import Button from './button';
import { useContext, useState } from 'react';
import { CartContext } from '../store/cartContext';

const MealItem = ({ meal }) => {
    const cartContext = useContext(CartContext);
    
    const [isAdding, setIsAdding] = useState(false);

    const handleCartCount = async () => {
        setIsAdding(true);
        cartContext.addItem(meal);
        
        // Reset button state after animation
        setTimeout(() => setIsAdding(false), 600);
    };
    return (
        <div className="meal-item">
        <article>
          

  
            <img src={`http://localhost:3000/images/${meal.image.split('/').pop()}`} alt={meal.name} />

            <h3 className="meal-item-title">{meal.name.substring(0, 15)}</h3>
            <h2 className="meal-item-price">{meal.price}</h2>
            <p className="meal-item-description">{meal.description}</p>
       <Button 
                onClick={handleCartCount} 
                content={isAdding ? "Adding..." : "Add to Cart"} 
                className={`cart-button ${isAdding ? 'adding' : ''}`}
                disabled={isAdding}
            />
     
        </article>
        </div>
    );
};

export default MealItem;