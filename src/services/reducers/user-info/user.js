import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, postLogin, postRegistration } from '../../../utils/api';


export const initialState = {
    isAuthChecked: false, //попытка проверки пользователя. Может быть удачной или нет. True - если была попытка. Отвечает за прелоудер
    
    data: null,

    isLoading: false,
    error: null,

    registerUserError: null,
    registerUserRequest: false,

    loginUserError: null,
    loginUserRequest: false,

    getUserError: null,
    getUserRequest: false
}
//асинхронный экшен
export const fetchRegistration = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'registration/fetchRegistration', //имя экшена
    async ({email, password, name}, { rejectWithValue }) => {      
            const data = await postRegistration(email, password, name);
            console.log('responce', data);
            if(!data) {
                return rejectWithValue(data);
            }
            return data;
        }    
)

export const fetchLoginUser = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'loginUser/fetchLoginUser', //имя экшена
    async ({email, password}, { rejectWithValue }) => {      
            const data = await postLogin(email, password);
            console.log('responce', data);
            if(!data) {
                return rejectWithValue(data);
            }
            return data;
        }    
)

export const fetchGetUser = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'getUser/fetchGetUser', //имя экшена
    async (_, { rejectWithValue }) => {      
            const data = await getUser();
            console.log('responce', data);
            if(!data) {
                return rejectWithValue(data);
            }
            return data;
        }    
)

//срез, описывает экшен и редьюсер
export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  extraReducers: (builder) => {    //для запросов
    builder 
        .addCase(fetchRegistration.pending, (state) => {
            state.registerUserRequest = true;
            state.registerUserError = null;
        })
        .addCase(fetchLoginUser.pending, (state) => {
            state.loginUserRequest = true;
            state.loginUserError = null;
        })
        .addCase(fetchGetUser.pending, (state) => {
            state.getUserRequest = true;
            state.getUserError = null;
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
            state.data = action.payload?.user;
            state.registerUserRequest = false;
        })
        .addCase(fetchLoginUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loginUserRequest = false;
        })
        .addCase(fetchGetUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.getUserRequest = false;
        })
        .addCase(fetchRegistration.rejected, (state, action) => {
            state.registerUserRequest = false;
            state.registerUserError = action.payload;
        })
        .addCase(fetchLoginUser.rejected, (state, action) => {
            state.loginUserRequest = false;
            state.loginUserError = action.payload;
        })
        .addCase(fetchGetUser.rejected, (state, action) => {
            state.getUserRequest = false;
            state.getUserError = action.payload;
        })
  }
})

export default registrationSlice.reducer;