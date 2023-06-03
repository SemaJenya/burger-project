import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../../utils/types';


export type TConstructorStore = {
  bun: TIngredient | null;
  ingredients: TIngredient[];
}

export const initialState: TConstructorStore = {
  bun: null,
  ingredients: []
}


//срез, описывает экшен и редьюсер
export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    createConstructor : {
      reducer: (state, action: PayloadAction<TIngredient>) => {   //это экшен
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        }
        else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
          return {payload: { ...ingredient, randomId: uuidv4() }};
        
      }
    },
    removeConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter((ingredient: TIngredient) => ingredient.randomId != action.payload)
    },
    reorder: (state, action) => {
      state.ingredients.splice(action.payload.to, 0, state.ingredients.splice(action.payload.from, 1)[0])
    }
  }
})

export const { reorder, removeConstructor, createConstructor  } = constructorSlice.actions;

export default constructorSlice.reducer;