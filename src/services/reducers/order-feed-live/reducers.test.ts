import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from "./actions";
import { initialState } from './reducers';
import liveOrdersReducer from './reducers';

describe('orders feed live reducers', () => {
    const data = {
        success: true,
        orders: [1, 2, 3, 4, 5],
        total: 50,
        totalToday: 5
    }

    it('should return the initial state', () => {
        expect(liveOrdersReducer(undefined, { type: '' })).toEqual(initialState);
    })

    it('should handle wsConnecting action', () => {
        const state = liveOrdersReducer(initialState, { type: wsConnecting.type, status: 'connecting'});
        expect(state).toEqual({...initialState, status: 'connecting'})   
    })

    it('should handle wsOpen action', () => {
        const state = liveOrdersReducer(initialState, { type: wsOpen.type, status: 'online'});
        expect(state).toEqual({...initialState, status: 'online'})   
    })

    it('should handle wsClose action', () => {
        const state = liveOrdersReducer(initialState, { type: wsClose.type, status: 'offline'});
        expect(state).toEqual({...initialState, status: 'offline'})   
    })

    it('should handle wsError action', () => {
        const state = liveOrdersReducer(initialState, { type: wsError.type, status: 'offline', payload: 'Ошибка соединения'});
        expect(state).toEqual({...initialState, status: 'offline', connectionError: 'Ошибка соединения'})   
    })

    it('should handle wsMessage action', () => {
        const state = liveOrdersReducer(initialState, { type: wsMessage.type, payload: data});
        expect(state).toEqual({...initialState, orders: data})   
    })
})