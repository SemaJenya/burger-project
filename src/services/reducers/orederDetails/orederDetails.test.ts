import { initialState, fetchOrder } from './orederDetails';
import orderReducer from './orederDetails';

export const testOrder = {
	success: true,
	name: "Space флюоресцентный бургер",
	order: {
		ingredients: [
			{
				_id: "643d69a5c3f7b9001cfa093d",
				name: "Флюоресцентная булка R2-D3",
				type: "bun",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/bun-01.png",
				image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
				__v: 0
			},
			{
				_id: "643d69a5c3f7b9001cfa093d",
				name: "Флюоресцентная булка R2-D3",
				type: "bun",
				proteins: 44,
				fat: 26,
				carbohydrates: 85,
				calories: 643,
				price: 988,
				image: "https://code.s3.yandex.net/react/code/bun-01.png",
				image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
				__v: 0
			},
			{
				_id: "643d69a5c3f7b9001cfa0943",
				name: "Соус фирменный Space Sauce",
				type: "sauce",
				proteins: 50,
				fat: 22,
				carbohydrates: 11,
				calories: 14,
				price: 80,
				image: "https://code.s3.yandex.net/react/code/sauce-04.png",
				image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
				image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
				__v: 0
			}
		],
		_id: "647f63628a4b62001c85560c",
		owner: {
			name: "Jane",
			email: "semajenya96@gmail.com",
			createdAt: "2023-04-18T10:04:10.573Z",
			updatedAt: "2023-05-12T17:35:12.705Z"
		},
		status: "done",
		name: "Space флюоресцентный бургер",
		createdAt: "2023-06-06T16:48:34.074Z",
		updatedAt: "2023-06-06T16:48:34.156Z",
		number: 7418,
		price: 2056
	}
}

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
