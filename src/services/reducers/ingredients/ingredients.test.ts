import { getIngredients } from "../../../utils/api";
import { ingredientsArray } from "../../../utils/tests";
import { TIngredient } from "../../../utils/types";
import { fetchIngredients, initialState } from "./ingredients";
import ingredientsReducer from './ingredients';

describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
    })

    it('should handle ingredientsReducer.pending state', () => {
        const state = ingredientsReducer(initialState, {type: fetchIngredients.pending.type});
        expect(state).toEqual({...initialState, isLoading: true, error: null});
    })
  
    it('should handle ingredientsReducer.fulfilled state', () => {
        const state = ingredientsReducer(initialState, {type: fetchIngredients.fulfilled.type, payload: ingredientsArray});
        expect(state).toEqual({...initialState, isLoading: false, data: ingredientsArray})
    })

    it('should handle ingredientsReducer.rejected state', () => {
        const state = ingredientsReducer(initialState, {type: fetchIngredients.rejected.type, payload: 'Ошибка на стороне сервера'});
        expect(state).toEqual({...initialState, isLoading: false, error: 'Ошибка на стороне сервера'})
    })
})


// Это для тестирования самого запроса к моковому серверу. Нам это не надо


// Это мы мокнули fetch запрос

// function createFetch (data: TIngredient[]): any {
//     return function () {
//         return new Promise((resolve) => {
//             resolve({
//                 ok: true,
//                 json: () => {
//                     return Promise.resolve(data)
//                 }
//             })
//         })
//     }
// }

// it('should smth ', async () => {
//     const fetchMock = jest.spyOn(global, 'fetch')
//     fetchMock.mockImplementation(createFetch(ingredientsArray))
//     console.log(fetchMock.mockImplementation(createFetch(ingredientsArray)));
    
//     const data = await getIngredients();
//     console.log(data);
            
// })
