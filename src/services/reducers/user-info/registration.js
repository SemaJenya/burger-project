import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postRegistration } from '../../../utils/api';


export const initialState = {
  email: '',
  password: '',
  name: '',
  accessToken: '',
  refreshToken: '',
  isLoading: false,
  error: null
}
//асинхронный экшен
export const fetchRegistration = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'registration/fetchRegistration', //имя экшена
    //функция формируеи пейлоад и возвращает его для редьюсера (то, что мы запишем в стор). Асинхронная ф-я peyload creater - полезная нагрузка
    async ({email, password, name}, { rejectWithValue, fulfillWithValue}) => {       //первый аргумент - при вызове ф-и в диспатч она передается аргументом(можно импользовать дальше в функциях)   второй аргумент - 
        try {
            const data = await postRegistration(email, password, name);
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
export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: (builder) => {    //для запросов
    builder 
        .addCase(fetchRegistration.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
            state.isLoading = false;
            state.email = action.payload.user.email;
            state.name = action.payload.user.name;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

        })
        .addCase(fetchRegistration.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })
  }
})

export default registrationSlice.reducer;