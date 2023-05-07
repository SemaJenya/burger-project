import { configureStore } from '@reduxjs/toolkit'
import constructor from './reducers/constructor';
import counter, { counterSlice } from './reducers/counter';
import ingredientDetails from './reducers/ingredientDetails';
import ingredients from './reducers/ingredients';
import order from './reducers/orederDetails';
import registration from './reducers/user-info/user';
import liveOrdersReducer from './reducers/order-feed-live/reducers';


export const store = configureStore({
  reducer: {
    ingredientsStore: ingredients,
    constructorStore: constructor,
    ingredientDetailsStore: ingredientDetails,
    orderStore: order,
    counterStore: counter, 
    userStore: registration,
    liveOrdersStore: liveOrdersReducer,
  },
});

export default store;

export type RootState =  ReturnType<typeof store.getState> ;
export type AppDispatch = typeof store.dispatch;
export type ThunkApi = {
  dispatch: AppDispatch;
}