import { configureStore } from '@reduxjs/toolkit'
import constructor from './reducers/constructor/constructor';
import counter, { counterSlice } from './reducers/counter/counter';
import ingredientDetails from './reducers/ingredientDetails/ingredientDetails';
import ingredients from './reducers/ingredients/ingredients';
import order from './reducers/orederDetails/orederDetails';
import registration from './reducers/user-info/user';
import liveOrdersReducer from './reducers/order-feed-live/reducers';
import { TWsActions, socketMiddleware } from './middleware/socket-middlewar';
import { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } from '../services/reducers/order-feed-live/actions'

const wsActions: TWsActions = {
  wsConnect,
  wsDisconnect,
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
}

const liveOrdersMiddleware = socketMiddleware(wsActions)

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
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(liveOrdersMiddleware)
  }
});

export default store;

export type RootState =  ReturnType<typeof store.getState> ;
export type AppDispatch = typeof store.dispatch;
export type ThunkApi = {
  dispatch: AppDispatch;
}