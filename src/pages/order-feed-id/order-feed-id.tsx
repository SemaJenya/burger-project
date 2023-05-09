
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { useDispatch, useSelect } from '../../services/hooks';
import { useEffect, useMemo } from 'react';
import { TIngredient } from '../../utils/types';
import { OrderIdDetails } from '../../components/order-id-details/order-id-details';
import { useParams } from 'react-router-dom';
import { TOrder } from '../../services/reducers/order-feed-live/reducers';
import { wsConnect } from '../../services/reducers/order-feed-live/actions';



export const OrderFeedID = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));
    }, [dispatch]);

    const params = useParams();
    const orderNumber = params.id;

    return (
        <section className={s.orderID__page}>
            <div className={s.content__container}>
                <p className={sel(s.order__number, 'text text_type_digits-default', 'mb-10')}>#{orderNumber}</p>
                {orderNumber && <OrderIdDetails /> }           
            </div>
        </section>
    )
}