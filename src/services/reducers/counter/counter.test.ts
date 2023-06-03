
import { addCounter, reduceCounter, initialState } from './counter';
import counterReducer from './counter'; // import reducer



describe('constructor reducer', () => {
    it('should return the initial state', () => {                                      // reducer - функция. Принимает 2 аргумента (начальное состояние и экшен)
        expect(counterReducer(undefined, { type: '' })).toEqual(initialState)      //undefined так как пока стор запускается, то initialState пока нет. Второй аргумент - экшен. Пока передаем пустой
    })

    it('should increase the counter when adding a bun', () => {
        const testBunOne = {
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
            __v: 0,
        }

        const state = counterReducer(initialState, { type: addCounter.type, payload: testBunOne })  
        expect(state.counter[testBunOne._id].count).toBe(2)

    })

    it('should increase the counter when adding another bun', () => {
        const newInitialState = {
            counter: {
                '1': {
                    "type": "bun",
                    "count": 2,
                },
                '3': {
                    "type": "ingredient",
                    "count": 1,
                }
            }
        }

        const finalInitialState = {
            counter: {
                '2': {
                    "type": "bun",
                    "count": 2,
                },
                '3': {
                    "type": "ingredient",
                    "count": 1,
                }
            }
        }

        const testBunTwo = {
            _id: "2",
            name: "Другая булка",
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

        const state = counterReducer(newInitialState, { type: addCounter.type, payload: testBunTwo })  
        expect(state).toEqual(finalInitialState)
        
    })

    it('should increase the counter when adding a ingredient', () => {
        const testIngredient = {
            _id: "11",
            name: "Ingredient one",
            type: "main",
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

        const stateOne = counterReducer(initialState, { type: addCounter.type, payload: testIngredient })  
        const stateTwo = counterReducer(stateOne, { type: addCounter.type, payload: testIngredient })  
        const stateThree = counterReducer(stateTwo, { type: addCounter.type, payload: testIngredient })  
        expect(stateThree.counter[testIngredient._id].count).toBe(3)
    })

    it('should decrease the counter after removal one ingredient', () => {
        const newInitialState = {
            counter: {
                '1': {
                    "type": "bun",
                    "count": 2,
                },
                '11': {
                    "type": "ingredient",
                    "count": 5,
                }
            }
        }
        const testIngredient = {
            _id: "11",
            name: "Ingredient one",
            type: "main",
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

        const stateOne = counterReducer(newInitialState, { type: reduceCounter.type, payload: testIngredient })  
        expect(stateOne.counter[testIngredient._id].count).toBe(4)
    })

    it('should remove counter and ingredient from constructor', () => {
        const newInitialState = {
            counter: {
                '1': {
                    "type": "bun",
                    "count": 2,
                },
                '11': {
                    "type": "ingredient",
                    "count": 1,
                }
            }
        }

        const finalState = {
            counter: {
                '1': {
                    "type": "bun",
                    "count": 2,
                }
            }
        }
        const testIngredient = {
            _id: "11",
            name: "Ingredient one",
            type: "main",
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

        const state = counterReducer(newInitialState, { type: reduceCounter.type, payload: testIngredient })  
        expect(state).toEqual(finalState)
        
    })
})


