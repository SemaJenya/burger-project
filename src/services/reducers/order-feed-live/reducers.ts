import { createReducer } from "@reduxjs/toolkit"
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions"

type TOrdersReduser = {
    status: string;
    connectionError: string | unknown;
    orders: [] | unknown
}

const initialState: TOrdersReduser = {
    status: 'offline',
    connectionError: '',
    orders: []
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
            state = {...state, connectionError: action.payload}
        })
        .addCase(wsMessage, (state, action) => {
            state = {...state, orders: action.payload}
        })
})

export default liveOrdersReducer