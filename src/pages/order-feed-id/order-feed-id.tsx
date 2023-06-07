
import sel from 'classnames';
import s from './style.module.css';
import { useDispatch } from '../../services/hooks';
import { useEffect } from 'react';
import { OrderIdDetails } from '../../components/order-id-details/order-id-details';
import { useParams } from 'react-router-dom';
import { wsConnect, wsDisconnect } from '../../services/reducers/order-feed-live/actions';



export const OrderFeedID = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnect('wss://norma.nomoreparties.space/orders/all'));

        return () => {
            dispatch(wsDisconnect());
        }
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