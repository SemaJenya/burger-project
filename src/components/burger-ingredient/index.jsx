import s from './style.module.css';
import sel from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export const BurgerIngredient = ({ ...data }) => {
    return (
        <div className={sel(s.ingredient__conteiner, 'mb-10')}>
            <img src={data.image} alt={data.name} className={s.image} />
            <p className={sel(s.price, 'text text_type_digits-default', 'mt-1', 'mb-1')}>{data.price} <CurrencyIcon type="primary" /></p>
            <h3 className={sel(s.title, 'text text_type_main-default')}>{data.name}</h3>
        </div>
    )
}