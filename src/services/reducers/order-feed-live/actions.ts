import { createAction } from "@reduxjs/toolkit";
import { TOrdersWS } from "./reducers";


export const wsConnect = createAction<string>('ORDER_FEED_WS_CONNECT');
export const wsDisconnect = createAction('ORDER_FEED_WS_DISCONNECT');
export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING');
export const wsOpen = createAction('ORDER_FEED_WS_OPEN');
export const wsClose = createAction('ORDER_FEED_WS_CLOSE');
export const wsMessage = createAction<TOrdersWS>('ORDER_FEED_WS_MESSAGE');
export const wsError = createAction<string | undefined>('ORDER_FEED_WS_ERROR');

