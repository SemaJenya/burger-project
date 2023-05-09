
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { useEffect } from 'react';
import { useDispatch, useSelect } from '../../services/hooks';
import { wsConnect } from '../../services/reducers/order-feed-live/actions';




export const OrderFeed = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));
    }, [dispatch]);

    
    const orders = useSelect(state => state.liveOrdersStore.orders);
    const arr = orders?.orders;
    

    return (
        <section className={s.feed__page}>
            <h2 className={sel('text text_type_main-large mt-10', 'mb-6')}>Лента заказов</h2>
            <div className={s.content__container}>
                <div className={sel(s.order__container, 'custom-scroll')}>
                    {arr?.map((order) => <OrderFeedDetails order={order} key={order.number}/>)}
                </div>
                <OrdersBoard />
            </div>
       </section>
    )
}