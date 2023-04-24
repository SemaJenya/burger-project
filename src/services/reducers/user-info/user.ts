import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser, logoutUser, postLogin, postRegistration, updateUserData } from '../../../utils/api';
import { deleteCookie, setCookie } from '../../../utils/cookie';




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
    async (userData, { rejectWithValue }) => {      
            const data = await postRegistration(userData);
            if(!data?.success) {
                return rejectWithValue(data);
            }
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            return data?.user;
        }    
)

export const fetchLoginUser = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'loginUser/fetchLoginUser', //имя экшена
    async (userData, { rejectWithValue }) => {      
            const data = await postLogin(userData);
            if(!data?.success) {
                return rejectWithValue(data);
            }
            setCookie('accessToken', data.accessToken);
            setCookie('refreshToken', data.refreshToken);
            return data.user;
        }    
)


export const checkUserAuth = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'userAuth/checkUserAuth', //имя экшена
    async (_, { rejectWithValue, dispatch }) => {    
        try {
            const data = await getUser();
            if(!data?.success) {
                return rejectWithValue(data);
            }
            return data.user;
        } 
        catch (error) {
            return rejectWithValue(error);
        }  
        finally {
            dispatch(authCheck());
        }
            
        }    
)

export const fetchLogout = createAsyncThunk(  //возвращает объект с методами pending, fulfield, reject
    'userLogout/checkUserAuth', //имя экшена
    async (_, { rejectWithValue, dispatch }) => {    
        const data = await logoutUser();
        if(!data?.success) {
            return rejectWithValue(data);
        }
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        return data;
    } 
)

export const fetchChangeProfile = createAsyncThunk (
    'userChange/fetchChangeProfile', //имя экшена
    async (userData, { rejectWithValue }) => {    
        const data = await updateUserData(userData);
        if(!data?.success) {
            return rejectWithValue(data);
        }
        return data;
    } 
)

//срез, описывает экшен и редьюсер
export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
        authCheck: (state) => {
            state.isAuthChecked = true;
        },
  },
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
        .addCase(checkUserAuth.pending, (state) => {
            state.getUserRequest = true;
            state.getUserError = null;
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
            state.data = action.payload;
            state.registerUserRequest = false;
        })
        .addCase(fetchLoginUser.fulfilled, (state, action) => {
            state.data = action.payload;
            state.loginUserRequest = false;
        })
        .addCase(checkUserAuth.fulfilled, (state, action) => {
            state.data = action.payload;
            state.getUserRequest = false;
        })
        .addCase(fetchLogout.fulfilled, (state, action) => {
            state.data = null;
        })
        .addCase(fetchChangeProfile.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        .addCase(fetchRegistration.rejected, (state: any, action) => {
            state.registerUserRequest = false;
            state.registerUserError = action.payload;
        })
        .addCase(fetchLoginUser.rejected, (state: any, action) => {
            state.loginUserRequest = false;
            state.loginUserError = action.payload;
        })
        .addCase(checkUserAuth.rejected, (state: any, action) => {
            state.getUserRequest = false;
            state.getUserError = action.payload;
        })
  }
})

export const { authCheck } = registrationSlice.actions;

export default registrationSlice.reducer;