import { useEffect, useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



export const IngredientsID = () => {
    const params = useParams();
    const ingredientID = params.id;

    const ingredients = useSelector(state => state.ingredientsStore.data);
    const currentIngredient = ingredients?.find(item => `${item._id }`=== ingredientID) || {}
   
    return (
        <div className={s.page}>
            <div className={s.container}>
                <h2 className={sel(s.title, 'text text_type_main-large')}>Детали ингредиента</h2>
                <img src={currentIngredient?.image_large}/>
                <p className={sel(s.subtitle, 'text text_type_main-medium mb-8')}>{currentIngredient?.name}</p>

                <ul className={s.calories}>
                    <li className={s.nutrients}>
                        <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Калории,ккал</p>
                        <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.calories}</p>
                    </li>
                    <li className={s.nutrients}>
                        <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Белки, г</p>
                        <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.proteins}</p>
                    </li>
                    <li className={s.nutrients}>
                        <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Жиры, г</p>
                        <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.fat}</p>
                    </li>
                    <li className={s.nutrients}>
                        <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Углеводы, г</p>
                        <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.carbohydrates}</p>
                    </li>
                </ul>    
            </div>        
       </div>
    )
}