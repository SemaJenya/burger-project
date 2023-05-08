import { createAction } from "@reduxjs/toolkit";


export const wsConnect = createAction<any, "ORDER_FEED_WS_CONNECT">('ORDER_FEED_WS_CONNECT');
export const wsDisconnect = createAction('ORDER_FEED_WS_DISCONNECT');
export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING');
export const wsOpen = createAction('ORDER_FEED_WS_OPEN');
export const wsClose = createAction('ORDER_FEED_WS_CLOSE');
export const wsMessage = createAction('ORDER_FEED_WS_MESSAGE');
export const wsError = createAction('ORDER_FEED_WS_ERROR');
export const wsSend = createAction('ORDER_FEED_WS_SEND');
