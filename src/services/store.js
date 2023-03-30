import { configureStore } from '@reduxjs/toolkit'
import ingredients from './reducers/ingredients';

export const store = configureStore({
  reducer: {
    ingredientsStore: ingredients
  },
});

export default store;