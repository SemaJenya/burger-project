import { useEffect, useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IngredientDetails } from '../../components/ingredient-details';



export const IngredientsID = () => {
    const params = useParams();
    const ingredientID = params.id;
    

    const ingredients = useSelector(state => state.ingredientsStore.data);
    const currentIngredient = ingredients?.find(item => `${item._id }`=== ingredientID) || {}
   
    return (
        <div className={s.page}>
            <div className={s.container}>
                <h2 className={sel(s.title, 'text text_type_main-large')}>Детали ингредиента</h2>
                <IngredientDetails />      
            </div>        
       </div>
    )
}