import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export const initialState = {
  counter: {},
}

//срез, описывает экшен и редьюсер
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCounter: (state, action) => {   //это экшен
      const item_id = action.payload._id
      const existed_ids = Object.keys(state.counter)
      
      // handle buns 
      if(action.payload.type === 'bun' &&  !existed_ids.includes(item_id)) {
        let bun_id = null
        existed_ids.forEach(element => {
          if (state.counter[element].type === 'bun'){
            bun_id = element
            return
          }
        });
        console.log(bun_id)

        if (bun_id){
          delete state.counter[bun_id]          
        }

        state.counter[item_id] = {
          "type": "bun",
          "count": 2,
        }
    }

    // handle ingridients
    if(action.payload.type !== 'bun' && !existed_ids.includes(item_id)){
      state.counter[item_id] = {
        "type": "ingredient",
        "count": 1,
      }
    }
    if(action.payload.type !== 'bun' && existed_ids.includes(item_id)){
      state.counter[item_id]['count'] += 1
    }
  },

  reduceCounter: (state, action) => {
    const item_id = action.payload._id
    if (state.counter[item_id]['count'] > 1){
      state.counter[item_id]['count'] -= 1
    }
    else {
      delete state.counter[item_id] 
    }

  }
}
})


export const { addCounter, reduceCounter } = counterSlice.actions;

export default counterSlice.reducer;
