import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store";
import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { TOrdersWS } from "../reducers/order-feed-live/reducers";

type TAction = {
  payload: string;
  type: string;
}

export type TWsActions = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string | undefined>;
  wsMessage: ActionCreatorWithPayload<TOrdersWS>;
}

// ф-я созания мидлвара
export const socketMiddleware = (wsActions: TWsActions): Middleware => {   //урл будем передавать в экшене для того, чтобы переиспользовать мидлвар
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {   //сам мидлвар в качестве параметра принимает стор и имеет к нему доступ
    let socket: any = null;
    let wsUrl = '';
    let reconnectTimer = 0;
    let isConnected = false;
    let countConnecting = 0;
    const MAX_RECONNECTING = 5;

    return (next: any) => (action: TAction) => {    //это экшен
      const { dispatch } = store;  //в сторе есть методы диспатч и гет стейт и мы можем их оттуда доставать
      const { wsConnect, wsDisconnect, wsConnecting, wsOpen, wsClose, wsError, wsMessage } = wsActions;


      if (wsConnect.match(action)) {
        wsUrl = action.payload;
        socket = new WebSocket(`${wsUrl}`);
        isConnected = true;
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = (event: any): void => {
          dispatch(wsOpen());
        };

        socket.onerror = (event: any) => {
          dispatch(wsError(event.code?.toString()));
        };

        socket.onmessage = (event: any) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event: any) => {
          console.log('Im is on close');
          if (event.code !== 1000) {
            console.log('error close not 1000');
            dispatch(wsError(event.code?.toString()))
          }

          if (isConnected && event.code !== 1000) {
            console.log('повторное соединение');
            countConnecting++;
            if (countConnecting < MAX_RECONNECTING) {
              reconnectTimer = window.setTimeout(() => {
                dispatch(wsConnect(`${wsUrl}`))
              }, 3000)
            }
          }

        };

        // if (wsSend.match(action)) {
        //   // const message = '343434343';
        //   console.log(action.payload);
        //   // socket.send(JSON.stringify(message));
        // }
      }

      if (wsDisconnect.match(action) && socket) {
        console.log('closing');
        clearTimeout(reconnectTimer); //очищаем таймер, если попали в 3 сек
        isConnected = false;
        reconnectTimer = 0;
        socket.close(1000, 'Завершена работа')
        dispatch(wsClose());

      }

      next(action);
    };
  };
};