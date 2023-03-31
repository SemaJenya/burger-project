import { useEffect } from 'react'
import PropTypes from 'prop-types';
import s from './style.module.css';
import sel from 'classnames';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropType } from '../../utils/prop-type';
import { useDispatch } from 'react-redux';
import { createConstructor } from '../../services/reducers/constructor';


export const BurgerIngredient = ({onClick, ...data}) => {

    const dispatch = useDispatch();

    function hendleClickIngredient () {
        onClick(data);
        dispatch(createConstructor(data));
    }
    return (

        <div className={sel(s.ingredient__conteiner, 'mb-10')} onClick={hendleClickIngredient}>
            <Counter count={1} size="default" extraClass={sel(s.counter, "m-1")} />
            <img src={data.image} alt={data.name} className={s.image} />
            <p className={sel(s.price, 'text text_type_digits-default', 'mt-1', 'mb-1')}>{data.price} <CurrencyIcon type="primary" /></p>
            <h3 className={sel(s.title, 'text text_type_main-default')}>{data.name}</h3>
        </div>
    )
}

BurgerIngredient.propTypes = {
    onClick: PropTypes.func.isRequired,
    data: PropTypes.objectOf(ingredientsPropType.isRequired)
}