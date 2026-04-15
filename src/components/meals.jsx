import { useEffect, useState } from 'react';
import MealItem from "./mealItem";
import mealsData from "../data/meals";

const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for better UX
        const timer = setTimeout(() => {
            setLoadedMeals(mealsData);
            setIsLoading(false);
        }, 500);
        
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="meals-loader">
                    <div className="loader-spinner"></div>
                    <p>Loading delicious meals...</p>
                </div>
            ) : (
                <ul className="meals-list">
                    {loadedMeals.map((meal) => (
                        <li key={meal.id}>
                            <MealItem meal={meal} />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Meals;