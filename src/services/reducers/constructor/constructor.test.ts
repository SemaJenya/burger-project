
import {  reorder, removeConstructor, initialState, createConstructor , TConstructorStore } from './constructor';
import constructorReducer from './constructor'; // import reducer
import { testBun, testMain, testSauce } from '../../../utils/tests';



describe('constructor reducer', () => {
    it('should return the initial state', () => {                                      // reducer - функция. Принимает 2 аргумента (начальное состояние и экшен)
        expect(constructorReducer(undefined, { type: '' })).toEqual(initialState)      //undefined так как пока стор запускается, то initialState пока нет. Второй аргумент - экшен. Пока передаем пустой
    })

    it('should add bun in store', () => {
        const state = constructorReducer(initialState, { type: createConstructor.type, payload: testBun })    
        let bun = state.bun
        expect(bun).not.toBeNull();
        if (bun) {
            expect(bun).toBe(testBun)
        }

    })

    it('should add ingredient in store', () => {   
        const state = constructorReducer(initialState, { type: createConstructor .type, payload: testMain });
        const ingredient = state.ingredients;
        expect(ingredient.length).toBe(1)
    })

    it('should remove ingredient from store', () => {
        const stateInitial: TConstructorStore = {
            bun: null,
            ingredients: [
                testMain   
            ]
        }

        const finalState = constructorReducer(stateInitial, { type: removeConstructor.type, payload: '1'});   
        expect(finalState.ingredients.length).toBe(0)

    })

    it('should reorder ingredients', () => {
        const stateInitial: TConstructorStore = {
            bun: null,
            ingredients: [
                testMain,
                testSauce
            ]
        }

        const finalState = constructorReducer(stateInitial, { type: reorder.type, payload: {from: 0, to: 1}});
        expect(finalState.ingredients[0].randomId).toBe('2') 
    })
    
})


