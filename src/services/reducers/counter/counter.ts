import { createSlice } from '@reduxjs/toolkit';


export type TCounter= {
  type: string;
  count: number;
}

export type TCounterState = {
  counter: {[kye: string]: TCounter};
}

export const initialState: TCounterState = {
  counter: {}
}


//срез, описывает экшен и редьюсер
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addCounter: (state, action) => {   //это экшен
      const item_id: string = action.payload._id;
      const existed_ids: string[] = Object.keys(state.counter);
      
      // handle buns 
      if(action.payload.type === 'bun' &&  !existed_ids.includes(item_id)) {
        let bun_id = null
        existed_ids.forEach(element => {
          if (state.counter[element].type === 'bun'){
            bun_id = element
            console.log(element);
            
            return
          }
        });

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
    const item_id: string = action.payload._id
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
