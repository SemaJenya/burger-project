
import { useEffect } from 'react';
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { ProfileNavigate } from '../../components/profile-navigate/profile-navigate';
import { useDispatch, useSelect } from '../../services/hooks';
import s from './style.module.css';
import sel from 'classnames';
import { wsConnect } from '../../services/reducers/order-feed-live/actions';
import { getCookie } from '../../utils/cookie';


// тут нужно выгружать все заказы с сервера, но только наши
export const ProfileOrders = () => {

    const dispatch = useDispatch();

    const tokenArr = getCookie('accessToken')?.split(' ');
    const token = tokenArr ? tokenArr[1] : undefined;

    useEffect(() => {        
        dispatch(wsConnect(`wss://norma.nomoreparties.space/orders?token=${token}`));
    }, [dispatch]);


    const orders = useSelect(state => state.liveOrdersStore.orders);
    const allOrders = orders?.orders;

    return (
        <section className={s.page}>
            <div className={s.content__conteiner}>
                <div className={s.profile__navigation}>
                    <nav id='profile-nav'>
                        <ProfileNavigate />
                    </nav>
                    <p className={sel(s.subtitle, 'text text_type_main-default text_color_inactive')}>В этом разделе вы можете просмотреть свою историю заказов</p>
                </div>
                <div className={sel(s.orders, 'custom-scroll')}> 
                    {allOrders?.map(order => <OrderFeedDetails order={order} key={order.number}/>).reverse()}     
                </div>
            </div>        
        </section>
    )
}
