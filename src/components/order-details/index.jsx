import s from './style.module.css';
import sel from 'classnames';
import orderImage from '../../images/order-accpeted/popup/graphics.svg';
import { useSelector } from 'react-redux';


export const OrderDetails = () => {

    const {number} = useSelector(state => state.orderStore.data.order)
    return (
        <div className={s.order__box}>
            <h2 className={sel(s.order__number, 'text text_type_digits-large', 'mb-8')}>{number}</h2>
            <p className={sel(s.order__number_text, 'text text_type_main-medium', 'pb-15')}>идентификатор заказа</p>
            <img className={s.order__image} src={orderImage} alt='знак ок'/>
            <p className={sel(s.order__status, 'text text_type_main-default')}>Ваш заказ начали готовить</p>
            <p className={sel(s.order__wait, 'text text_type_main-default text_color_inactive', 'mt-2')}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}