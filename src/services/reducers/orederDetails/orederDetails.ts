import { SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderResponse, postOrderInfo } from '../../../utils/api';


export type TOrderState = {
    data: OrderResponse;
    isLoading: boolean;
    error: SerializedError | null | unknown;
}


export const initialState: TOrderState  = {
  data: {
    success: null,
    name: null,
    order: null
  },
  isLoading: false,
  error: null
}


//асинхронный экшен
export const fetchOrder = createAsyncThunk<any, string[]>(  
    'order/fetchOrder',
    async (dataID, {rejectWithValue, fulfillWithValue}) => {  
        try {
            const data = await postOrderInfo(dataID);         
            return fulfillWithValue(data); 
        }
        catch (error: any) {
            if(error.status) {
                return rejectWithValue(error);
            }
            return rejectWithValue({errorMessage: 'Ошибка на стороне сервера'});
        }    
    }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
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
            state.isLoading = false;
            state.error = action.payload;
        })
  }
})

export default orderSlice.reducer;