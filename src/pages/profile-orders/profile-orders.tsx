
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { ProfileNavigate } from '../../components/profile-navigate/profile-navigate';
import s from './style.module.css';
import sel from 'classnames';


export const ProfileOrders = () => {
    return (
        <section className={s.page}>
            <div className={s.content__conteiner}>
                <div className={s.profile__navigation}>
                    <nav id='profile-nav'>
                        <ProfileNavigate />
                    </nav>
                    <p className={sel(s.subtitle, 'text text_type_main-default text_color_inactive')}>В этом разделе вы можете просмотреть свою историю заказов</p>
                </div>
                <div className={s.orders}>
                    <OrderFeedDetails />
                </div>
            </div>        
        </section>
    )
}
