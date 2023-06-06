import { createReducer } from "@reduxjs/toolkit"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions"

export type TOrder = {
    createdAt: string;
    ingredients: Array<string>;
    name: string;
    number: number;
    status: 'done' | 'created' | 'pending';
    updatedAt: string;
    _id: string;
}

export type TOrdersWS = {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
}

type TOrdersReduser = {
    status: string;
    connectionError: string | unknown;
    orders: TOrdersWS | null | undefined
}

export const initialState: TOrdersReduser = {
    status: 'offline',
    connectionError: '',
    orders: null,
}

const liveOrdersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(wsConnecting, (state) => {            
            state.status = 'connecting';
        })
        .addCase(wsOpen, (state) => {            
            state.status = 'online';
            state.connectionError = ''
        })
        .addCase(wsClose, (state) => {            
            state.status = 'offline';
        })
        .addCase(wsError, (state, action) => {
            state.status = 'offline';
            state.connectionError = action.payload
        })
        .addCase(wsMessage, (state, action) => {
            state.orders = action.payload
        })
})

export default liveOrdersReducer