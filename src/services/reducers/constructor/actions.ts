import { createAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from "../../../utils/types";



const addElement = createAction('ADD_ELEMENT_IN_CONSTRUCTOR', function prepare (ingredient: TIngredient) {
    return {
        payload: {
            ...ingredient,
            randomId: uuidv4()
        }
    }
});

export default addElement