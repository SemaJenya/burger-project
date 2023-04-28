import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postOrderInfo } from '../../utils/api';
import { number } from 'prop-types';

type TOrderState = {
    data: [];
    isLoading: boolean;
    error: SerializedError | null | unknown;
}

export const initialState: TOrderState  = {
  data: [],
  isLoading: false,
  error: null
}

// <any, string>

//асинхронный экшен
export const fetchOrder = createAsyncThunk<any, string[]>(  //возвращает объект с методами pending, fulfield, reject
    'order/fetchOrder', //имя экшена
    //функция формируеи пейлоад и возвращает его для редьюсера (то, что мы запишем в стор). Асинхронная ф-я peyload creater - полезная нагрузка
    async (dataID, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {       //первый аргумент - при вызове ф-и в диспатч она передается аргументом(можно импользовать дальше в функциях)   второй аргумент - 
        try {
            const data = await postOrderInfo(dataID);         
            return fulfillWithValue(data); //возвращает пейлоад (то, что хранится в экшене) и записывает в стор
        }
        catch (error: any) {
            if(error.status) {
                return rejectWithValue(error);
            }
            return rejectWithValue({errorMessage: 'Ошибка на стороне сервера'});
        }    
    }
)
//значения return сверху прилетают в экшен функции снизу

//срез, описывает экшен и редьюсер
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {    //для запросов
    builder 
        .addCase(fetchOrder.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        .addCase(fetchOrder.rejected, (state, action) => {
            state = {...state, isLoading: false}
            state = {...state, error: action.payload}
        })
  }
})

export default orderSlice.reducer;