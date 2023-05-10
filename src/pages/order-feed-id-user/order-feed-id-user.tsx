
import { useEffect } from 'react';
import { OrderIdDetails } from '../../components/order-id-details/order-id-details';
import { useDispatch } from '../../services/hooks';
import { wsConnect } from '../../services/reducers/order-feed-live/actions';
import { getCookie } from '../../utils/cookie';
import sel from 'classnames';
import s from './style.module.css';




export const OrderFeedIDUser = () => {


    const dispatch = useDispatch()

    const tokenArr = getCookie('accessToken')?.split(' ');
    const token = tokenArr ? tokenArr[1] : undefined;

    useEffect(() => {
        dispatch(wsConnect(`wss://norma.nomoreparties.space/orders?token=${token}`));
    }, [dispatch]);

    return (
        <section className={s.orderID__page}>
            <div className={s.content__container}>
                <OrderIdDetails />
            </div>
        </section>
    )
}