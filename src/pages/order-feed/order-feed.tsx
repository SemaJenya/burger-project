
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { OrdersBoard } from '../../components/orders-board/orders-board';



export const OrderFeed = () => {

    return (
        <section className={s.feed__page}>
            <h2 className={sel('text text_type_main-large mt-10', 'mb-6')}>Лента заказов</h2>
            <div className={s.content__container}>
                <OrderFeedDetails />
                <OrdersBoard />
            </div>
       </section>
    )
}