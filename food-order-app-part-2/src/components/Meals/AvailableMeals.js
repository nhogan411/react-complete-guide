import { useState, useEffect } from 'react';
import useConnection from '../../hooks/useConnection';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [sortState, setSortState] = useState({field: 'id', direction: 'low-high'});

	const { isLoading, error, sendRequest: fetchMeals } = useConnection();

	useEffect(() => {
		const transformMeals = (mealsObj) => {
			let loadedMeals = [];

			for (const mealKey in mealsObj) {
				loadedMeals.push({
					id: mealKey,
					name: mealsObj[mealKey].name,
					description: mealsObj[mealKey].description,
					price: mealsObj[mealKey].price
				});
			}

			setMeals(loadedMeals);
		};

		fetchMeals({ url: 'https://react-guide-food-order-default-rtdb.firebaseio.com/meals.json' }, transformMeals);
	}, [fetchMeals]);

	const mealsSortHandler = (event) => {
		setSortState( prevState => {
			const newSortState = {...prevState};
			if ( event.target.id === 'sortField' ) {
				newSortState.field = event.target.value;
			} else if ( event.target.id === 'sortDirection' ) {
				newSortState.direction = event.target.value;
			}
			return newSortState;
		});
	};

	meals.sort( (a, b) => {
		if (sortState.direction === 'high-low') {
			return ( a[sortState.field] > b[sortState.field] ) ? -1 : 1;
		} else {
			return ( a[sortState.field] < b[sortState.field] ) ? -1 : 1;
		}
	});

	const mealsList = meals.map((meal) => (
		<MealItem
			key={meal.id}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

  return (
    <section className={classes.meals}>
			{ !isLoading && !error &&
				<Card className={classes['meal-filters']}>
					<select id="sortField" onChange={mealsSortHandler} defaultValue={sortState}>
						<option value="id">Default</option>
						<option value="name">Name</option>
						<option value="description">Description</option>
						<option value="price">Price</option>
					</select>
					<select id="sortDirection" onChange={mealsSortHandler} defaultValue={sortState.direction}>
						<option value="low-high">Low to High</option>
						<option value="high-low">High to Low</option>
					</select>
				</Card>
			}
      <Card>
        { isLoading && <p>Loading tasks...</p> }
				{ !isLoading && !error && <ul>{mealsList}</ul> }
      </Card>
    </section>
  );
};

export default AvailableMeals;
