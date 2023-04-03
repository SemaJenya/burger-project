import PropTypes from 'prop-types';
import s from './style.module.css';
import sel from 'classnames';
import { BurgerIngredient } from '../burger-ingredient';
import { ingredientsPropType } from '../../utils/prop-type';
import React, { forwardRef } from 'react';


export const IngredientCategory = React.forwardRef(
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


IngredientCategory.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropType.isRequired).isRequired,
    id: PropTypes.string.isRequired,

}