import { configureStore } from '@reduxjs/toolkit'
import constructor from './reducers/constructor';
import ingredientDetails from './reducers/ingredientDetails';
import ingredients from './reducers/ingredients';
import order from './reducers/orederDetails';

export const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    ingredientDetailsStore: ingredientDetails,
    orderStore: order 
  },
});

export default store;