import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../../utils/api.js';

const initialState = {
  data: [],
  isLoading: false,
  error: null
}
//асинхронный экшен
export const fetchIngredients = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'ingredients/fetchIngredients', //имя экшена
    //функция формируеи пейлоад и возвращает его для редьюсера (то, что мы запишем в стор). Асинхронная ф-я peyload creater - полезная нагрузка
    async (_, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {       //первый аргумент - при вызове ф-и в диспатч она передается аргументом(можно импользовать дальше в функциях)   второй аргумент - 
      const data = await getIngredients();
        if(!data){
            return rejectWithValue({errorMessage: 'Ошибка на стороне сервера'});
        }
        console.log(data);
      return data  //возвращает пейлоад (то, что хранится в экшене)
      
    }
  )

//срез, описывает экшен и редьюсер
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  extraReducers: (builder) => {
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