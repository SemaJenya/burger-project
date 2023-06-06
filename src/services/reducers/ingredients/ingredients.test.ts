import { getIngredients } from "../../../utils/api";
import { TIngredient } from "../../../utils/types";
import { fetchIngredients, initialState } from "./ingredients";
import ingredientsReducer from './ingredients';


const ingredientsArray: TIngredient[] = [
    {
        '_id': "643d69a5c3f7b9001cfa093c",
        'name': "Краторная булка N-200i",
        'type': "bun",
        'proteins': 80,
        'fat': 24,
        'carbohydrates': 53,
        'calories': 420,
        'price': 1255,
        'image': "https://code.s3.yandex.net/react/code/bun-02.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/bun-02-large.png",
    },
    {
        '_id': "643d69a5c3f7b9001cfa0941",
        'name': "Биокотлета из марсианской Магнолии",
        'type': "main",
        'proteins': 420,
        'fat': 142,
        'carbohydrates': 242,
        'calories': 4242,
        'price': 424,
        'image': "https://code.s3.yandex.net/react/code/meat-01.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/meat-01-large.png",
    },
    {
        '_id': "643d69a5c3f7b9001cfa0942",
        'name': "Соус Spicy-X",
        'type': "sauce",
        'proteins': 30,
        'fat': 20,
        'carbohydrates': 40,
        'calories': 30,
        'price': 90,
        'image': "https://code.s3.yandex.net/react/code/sauce-02.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    },
    {
        '_id': "643d69a5c3f7b9001cfa0948",
        'name': "Кристаллы марсианских альфа-сахаридов",
        'type': "main",
        'proteins': 234,
        'fat': 432,
        'carbohydrates': 111,
        'calories': 189,
        'price': 762,
        'image': "https://code.s3.yandex.net/react/code/core.png",
        'image_mobile': "https://code.s3.yandex.net/react/code/core-mobile.png",
        'image_large': "https://code.s3.yandex.net/react/code/core-large.png",
    }
];


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
