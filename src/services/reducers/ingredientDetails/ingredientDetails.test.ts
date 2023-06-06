import { createIngredientDetails, initialState } from './ingredientDetails';
import ingredientDetailsReducer from './ingredientDetails';

describe('ingredient details reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientDetailsReducer(undefined, { type: '' })).toEqual(initialState) 
    })

    it('should add ingredient in store', () => {
        const testIngredient = {
            _id: "1",
            name: "Краторная булка N-200i",
            type: "bun",
            proteins: 80,
            fat: 24,
            carbohydrates: 53,
            calories: 420,
            price: 1255,
            image: "https://code.s3.yandex.net/react/code/bun-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
            __v: 0
        }

        const state = ingredientDetailsReducer(initialState, { type: createIngredientDetails.type, payload: testIngredient })
        expect(state).toEqual({...initialState, ingredient: testIngredient})
          
    })
})

