import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserLogin, UserLogout, UserObject, UserRegister, getUser, logoutUser, postLogin, postRegistration, updateUserData } from '../../../utils/api';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { ThunkApi } from '../../store';


export interface TUserState {
    isAuthChecked: boolean;
    
    data: UserObject | null;

    isLoading: boolean;
    error: SerializedError | null;

    registerUserError: SerializedError | null | unknown;
    registerUserRequest: boolean;

    loginUserError: SerializedError | null | unknown;
    loginUserRequest: boolean;

    getUserError: SerializedError | null | unknown;
    getUserRequest: boolean;
}

export const initialState: TUserState = {
    isAuthChecked: false,                                                       //попытка проверки пользователя. Может быть удачной или нет. True - если была попытка. Отвечает за прелоудер
    
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
export const fetchRegistration = createAsyncThunk<UserObject, UserRegister>(    //возвращает объект с методами pending, fulfield, reject
    'registration/fetchRegistration',                                           //имя экшена
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

export const fetchLoginUser = createAsyncThunk<UserObject, UserLogin>(  
    'loginUser/fetchLoginUser', 
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


export const checkUserAuth = createAsyncThunk<UserObject, void, ThunkApi>( 
    'userAuth/checkUserAuth', 
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

export const fetchLogout = createAsyncThunk<UserLogout, void>(  
    'userLogout/checkUserAuth', 
    async (_, { rejectWithValue }) => {    
        const data = await logoutUser();
        if(!data?.success) {
            return rejectWithValue(data);
        }
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        return data;
    } 
)

export const fetchChangeProfile = createAsyncThunk<UserObject, UserRegister> (
    'userChange/fetchChangeProfile', 
    async (userData, { rejectWithValue }) => {    
        const data = await updateUserData(userData);     
        if(!data?.success) {
            return rejectWithValue(data);
        }
        console.log(data);
        
        return data?.user;
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
  extraReducers: (builder) => {    
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
        .addCase(fetchLogout.fulfilled, (state) => {
            state.data = null;
        })
        .addCase(fetchChangeProfile.fulfilled, (state, action) => {
            state.data = action.payload;
        })
        .addCase(fetchRegistration.rejected, (state, action) => {
            state.registerUserRequest = false;
            state.registerUserError = action.payload;
        })
        .addCase(fetchLoginUser.rejected, (state, action) => {
            state.loginUserRequest = false;
            state.loginUserError = action.payload;
        })
        .addCase(checkUserAuth.rejected, (state, action) => {
            state.getUserRequest = false;
            state.getUserError = action.payload;
        })
  }
})

export const { authCheck } = registrationSlice.actions;

export default registrationSlice.reducer;