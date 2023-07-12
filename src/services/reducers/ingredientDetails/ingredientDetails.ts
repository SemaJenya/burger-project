import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  ingredient: null
}



//срез, описывает экшен и редьюсер
export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    createIngredientDetails: (state, action) => {   //это экшен
      state.ingredient = action.payload;
    }
  }
})

export const {createIngredientDetails} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;