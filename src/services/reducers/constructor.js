import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
  bun: null,
  ingredients: []
}

//значения return сверху прилетают в экшен функции снизу

//срез, описывает экшен и редьюсер
export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    createConstructor: (state, action) => {   //это экшен
        if(action.payload.type === 'bun') {
            state.bun = {...action.payload, randomId: uuidv4()};
        }
        else {
            state.ingredients.push({...action.payload, randomId: uuidv4()});     
        }
    }
  }
})

export const {createConstructor} = constructorSlice.actions;

export default constructorSlice.reducer;