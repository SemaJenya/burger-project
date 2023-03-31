import { configureStore } from '@reduxjs/toolkit'
import constructor from './reducers/constructor';
import ingredientDetails from './reducers/ingredientDetails';
import ingredients from './reducers/ingredients';

export const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    ingredientDetailsStore: ingredientDetails
  },
});

export default store;