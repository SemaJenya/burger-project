import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api.js';

export const initialState = {
  data: [],
  isLoading: false,
  error: null
}
//асинхронный экшен
export const fetchIngredients = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'ingredients/fetchIngredients', //имя экшена
    //функция формируеи пейлоад и возвращает его для редьюсера (то, что мы запишем в стор). Асинхронная ф-я peyload creater - полезная нагрузка
    async (_, { rejectWithValue, fulfillWithValue}) => {       //первый аргумент - при вызове ф-и в диспатч она передается аргументом(можно импользовать дальше в функциях)   второй аргумент - 
        try {
            const data = await getIngredients();
            if(!Array.isArray(data)) {
                throw new Error({error: 'Ошибка. Данные не получены', status: '404'})
            }
            return fulfillWithValue(data); //возвращает пейлоад (то, что хранится в экшене) и записывает в стор
        }
        catch (error) {
            if(error.status) {
                return rejectWithValue(error);
            }
            return rejectWithValue({errorMessage: 'Ошибка на стороне сервера'});
        }    
    }
)
//значения return сверху прилетают в экшен функции снизу

//срез, описывает экшен и редьюсер
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {    //для запросов
    builder 
        .addCase(fetchIngredients.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchIngredients.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchIngredients.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
  }
})

export default ingredientsSlice.reducer;