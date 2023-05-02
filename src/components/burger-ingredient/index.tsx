
import { Link, useLocation } from 'react-router-dom';
import s from './style.module.css';
import sel from 'classnames';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createIngredientDetails } from '../../services/reducers/ingredientDetails';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelect } from '../../services/hooks';
import { TIngredient } from '../../utils/types';
import { TCounterState } from '../../services/reducers/counter';



export const BurgerIngredient: React.FC<TIngredient> = ({...data}) => {

  

    const counter = useSelect(state => state.counterStore.counter) as TCounterState | any;

    const dispatch = useDispatch();
    const location = useLocation();

    function hendleClickIngredient () {
        dispatch(createIngredientDetails(data));
    }


    //  //все для DnD
     const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: {data},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (

        <Link to={{pathname: `ingredients/${data._id}`}} state={{background: location}} replace={true} className={sel(s.ingredient__conteiner, 'mb-10')}  draggable='true' ref={dragRef} onClick={hendleClickIngredient}>
            {Object.keys(counter).includes(data._id) &&
            <Counter count={counter[data._id]['count']} size="default" extraClass={sel(s.counter, "m-1")} />}
            <img src={data.image} alt={data.name} className={s.image}  />
            <p className={sel(s.price, 'text text_type_digits-default', 'mt-1', 'mb-1')}>{data.price} <CurrencyIcon type="primary" /></p>
            <h3 className={sel(s.title, 'text text_type_main-default')}>{data.name}</h3>
        </Link>
    )
}
