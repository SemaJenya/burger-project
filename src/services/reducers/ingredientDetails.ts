import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  ingredient: null
}

//значения return сверху прилетают в экшен функции снизу

//срез, описывает экшен и редьюсер
export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    createIngredientDetails: (state, action) => {   //это экшен
      state.ingredient = action.payload;
    },
    // removeIngredientDetails: (state, action) => {    //тут надо как-то очищать стор при закрытии модального окна, чтобы стор не засорялся
    //   console.log(action.payload);
    // }
  }
})

export const {createIngredientDetails} = ingredientDetailsSlice.actions;

export default ingredientDetailsSlice.reducer;