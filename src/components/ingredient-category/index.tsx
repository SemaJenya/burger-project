
import s from './style.module.css';
import sel from 'classnames';
import { BurgerIngredient } from '../burger-ingredient';
import React, { Ref } from 'react';
import { TIngredient } from '../../utils/types';

type TIngredientCategory = {
    title: string;
    ingredients: TIngredient[];
    id: string;
    ref: Ref<HTMLDivElement>;
} 

export const IngredientCategory: React.FC<TIngredientCategory> = React.forwardRef(
    ({title, ingredients, id}, ref) => {
   
    return (
        <>
            <h2 className={sel(s.title, "text_type_main-medium")} id={id} ref={ref}>{title}</h2>
            <div className={s.category__list}>
                {ingredients?.map(data => {return (<BurgerIngredient {...data} key={data._id} /> )})}
            </div>          
        </>
    )
}
)
