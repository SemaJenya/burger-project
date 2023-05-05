
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelect } from '../../services/hooks';
import { relative } from 'path';
import { TIngredient } from '../../utils/types';



export const OrderBurgerComposition = (data: TIngredient) => {

    const { ingredients } = useSelect(state => state.constructorStore);
 

    return (
        <div className={s.ingredient} style={{position: 'absolute', top: 0, left: 0, zIndex: 7}} >
            <img className={s.image} src={data.image} /> 
        </div>   
    )
}