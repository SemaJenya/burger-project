import { v4 as uuidv4 } from 'uuid';
import {  reorder, removeConstructor, initialState, createConstructor , TConstructorStore } from './constructor';
import constructorReducer from './constructor'; // import reducer
import { useSelect } from '../../hooks';



describe('constructor reducer', () => {
    it('should return the initial state', () => {                                      // reducer - функция. Принимает 2 аргумента (начальное состояние и экшен)
        expect(constructorReducer(undefined, { type: '' })).toEqual(initialState)      //undefined так как пока стор запускается, то initialState пока нет. Второй аргумент - экшен. Пока передаем пустой
    })

    it('should add bun in store', () => {
        const testBun = {
            _id: "643d69a5c3f7b9001cfa093c",
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
            __v: 0,
        }

        const state = constructorReducer(initialState, { type: createConstructor.type, payload: testBun })    
        let bun = state.bun
        expect(bun).not.toBeNull();
        if (bun) {
            expect(bun).toBe(testBun)
        }

    })

    it('should add ingredient in store', () => {
        const testIngredient = {
            _id: "643d69a5c3f7b9001cfa093e",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0
        };
        const state = constructorReducer(initialState, { type: createConstructor .type, payload: testIngredient });
        const ingredient = state.ingredients;
        expect(ingredient.length).toBe(1)
    })

    it('should remove ingredient from store', () => {
        const stateInitial: TConstructorStore = {
            bun: null,
            ingredients: [
                {
                    _id: "643d69a5c3f7b9001cfa093e",
                    name: "Филе Люминесцентного тетраодонтимформа",
                    type: "main",
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 643,
                    price: 988,
                    image: "https://code.s3.yandex.net/react/code/meat-03.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
                    randomId: '1'
                }
            ]
        }

        const finalState = constructorReducer(stateInitial, { type: removeConstructor.type, payload: '1'});   
        expect(finalState.ingredients.length).toBe(0)

    })

    it('should reorder ingredients', () => {
        const stateInitial: TConstructorStore = {
            bun: null,
            ingredients: [
                {
                    _id: "643d69a5c3f7b9001cfa093e",
                    name: "Филе Люминесцентного тетраодонтимформа",
                    type: "main",
                    proteins: 44,
                    fat: 26,
                    carbohydrates: 85,
                    calories: 643,
                    price: 988,
                    image: "https://code.s3.yandex.net/react/code/meat-03.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
                    randomId: '1'
                },
                {
                    _id: "643d69a5c3f7b9001cfa0942",
                    name: "Соус Spicy-X",
                    type: "sauce",
                    proteins: 30,
                    fat: 20,
                    carbohydrates: 40,
                    calories: 30,
                    price: 90,
                    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
                    randomId: '2'
                }
            ]
        }

        const finalState = constructorReducer(stateInitial, { type: reorder.type, payload: {from: 0, to: 1}});
        expect(finalState.ingredients[0].randomId).toBe('2') 
    })
    
})


