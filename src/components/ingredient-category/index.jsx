import PropTypes from 'prop-types';
import s from './style.module.css';
import sel from 'classnames';
import { BurgerIngredient } from '../burger-ingredient';
import { ingredientsPropType } from '../../utils/prop-type';
import { useSelector } from 'react-redux';
import { counter } from '../app';
import { useMemo } from 'react';

export const IngredientCategory = ({title, ingredients, id}) => {
   
    return (
        <>
            <h2 className={sel(s.title, "text_type_main-medium")} id={id}>{title}</h2>
            <div className={s.category__list}>
                {ingredients?.map(data => <BurgerIngredient {...data} key={data._id} /> )}
            </div>          
        </>
    )
}

IngredientCategory.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(ingredientsPropType.isRequired).isRequired,
    id: PropTypes.string.isRequired,
}