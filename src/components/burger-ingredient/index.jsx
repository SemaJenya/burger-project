import { useEffect } from 'react'
import PropTypes from 'prop-types';
import s from './style.module.css';
import sel from 'classnames';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsPropType } from '../../utils/prop-type';
import { useDispatch, useSelector } from 'react-redux';
import { createConstructor } from '../../services/reducers/constructor';
import { createIngredientDetails } from '../../services/reducers/ingredientDetails';
import { useDrag } from 'react-dnd';




export const BurgerIngredient = ({...data}) => {

    const counter = useSelector(state => state.counterStore.counter);

    const dispatch = useDispatch();

    function hendleClickIngredient () {
        // dispatch(createConstructor(data));
        dispatch(createIngredientDetails(data));
    }


    //  //все для DnD
     const [{isDrag}, dragRef] = useDrag({
        type: 'ingredient',
        item: {data},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });



    return (

        <div className={sel(s.ingredient__conteiner, 'mb-10')} onClick={hendleClickIngredient} draggable='true' ref={dragRef}>
            {Object.keys(counter).includes(data._id) &&
            <Counter count={counter[data._id]['count']} size="default" extraClass={sel(s.counter, "m-1")} />}
            <img src={data.image} alt={data.name} className={s.image}  />
            <p className={sel(s.price, 'text text_type_digits-default', 'mt-1', 'mb-1')}>{data.price} <CurrencyIcon type="primary" /></p>
            <h3 className={sel(s.title, 'text text_type_main-default')}>{data.name}</h3>
        </div>
    )
}

BurgerIngredient.propTypes = {
    data: PropTypes.objectOf(ingredientsPropType.isRequired)
}