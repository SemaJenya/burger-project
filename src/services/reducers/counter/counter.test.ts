
import { testBun, testBunTwo, testMain } from '../../../utils/tests';
import { addCounter, reduceCounter, initialState } from './counter';
import counterReducer from './counter'; // import reducer


describe('constructor reducer', () => {
    it('should return the initial state', () => {                                      // reducer - функция. Принимает 2 аргумента (начальное состояние и экшен)
        expect(counterReducer(undefined, { type: '' })).toEqual(initialState)      //undefined так как пока стор запускается, то initialState пока нет. Второй аргумент - экшен. Пока передаем пустой
    })

    it('should increase the counter when adding a bun', () => {
        const state = counterReducer(initialState, { type: addCounter.type, payload: testBun })  
        expect(state.counter[testBun._id].count).toBe(2)

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

        const state = counterReducer(newInitialState, { type: addCounter.type, payload: testBunTwo })  
        expect(state).toEqual(finalInitialState)  
    })

    it('should increase the counter when adding a ingredient', () => {
        const stateOne = counterReducer(initialState, { type: addCounter.type, payload: testMain })  
        const stateTwo = counterReducer(stateOne, { type: addCounter.type, payload: testMain })  
        const stateThree = counterReducer(stateTwo, { type: addCounter.type, payload: testMain })  
        expect(stateThree.counter[testMain._id].count).toBe(3)
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

        const stateOne = counterReducer(newInitialState, { type: reduceCounter.type, payload: testMain })  
        expect(stateOne.counter[testMain._id].count).toBe(4)
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
       
        const state = counterReducer(newInitialState, { type: reduceCounter.type, payload: testMain })  
        expect(state).toEqual(finalState)
        
    })
})


