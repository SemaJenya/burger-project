import { testBun } from '../../../utils/tests';
import { createIngredientDetails, initialState } from './ingredientDetails';
import ingredientDetailsReducer from './ingredientDetails';

describe('ingredient details reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientDetailsReducer(undefined, { type: '' })).toEqual(initialState) 
    })

    it('should add ingredient in store', () => {
        const state = ingredientDetailsReducer(initialState, { type: createIngredientDetails.type, payload: testBun })
        expect(state).toEqual({...initialState, ingredient: testBun})
          
    })
})

