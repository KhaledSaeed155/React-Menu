import { useEffect, useState } from 'react';
import MealItem from "./mealItem";

const Meals = () => {
    const [loadedMeals, setLoadedMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchMeals() {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:3000/meals");
            const data = await response.json();
            console.log(data);
            setLoadedMeals(data);
        } catch (error) {
            console.error('Failed to fetch meals:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMeals();
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