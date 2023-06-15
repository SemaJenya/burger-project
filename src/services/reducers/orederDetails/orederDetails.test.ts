import { testOrder } from '../../../utils/tests';
import { initialState, fetchOrder } from './orederDetails';
import orderReducer from './orederDetails';



describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
    });

    it('should handle fetchOrder.pending state', () => {
        const state = orderReducer(initialState, { type: fetchOrder.pending.type })
        expect(state).toEqual({...initialState, isLoading: true, error: null});
    });

    it('should handle fetchOrder.fulfilled state', () => {
        const state = orderReducer(initialState, { type: fetchOrder.fulfilled.type, payload: testOrder })
        expect(state).toEqual({...initialState, isLoading: false, data: testOrder });
    });

    it('should handle fetchOrder.rejected state', () => {
        const state = orderReducer(initialState, { type: fetchOrder.rejected.type, payload: 'Error' })
        expect(state).toEqual({...initialState, isLoading: false, error: 'Error' });
    });
})
