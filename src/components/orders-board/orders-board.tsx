
import sel from 'classnames';
import s from './style.module.css';
import { useSelect } from '../../services/hooks';



export const OrdersBoard = () => {

    const { orders } = useSelect(state => state.liveOrdersStore)
    const allOrders = orders?.orders;

    const totalOrders = orders?.total;
    const totalTodayOrders = orders?.totalToday;


    return (
        <div className={s.board__conteiner}>
            <div className={sel(s.order__status)}>
                <div className={s.ready__orders}>
                    <p className={sel(s.ready__text, 'text text_type_main-medium', 'mb-6')}>Готовы:</p>
                    <div className={sel(s.number__box)}>
                        {allOrders?.map((order) => {
                            if (order.status === 'done') {
                                return (
                                    <p className={sel(s.order__number, s.redy__number, 'text text_type_digits-default')} key={order._id}>{order.number}</p>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className={sel(s.in__work)}>
                    <p className={sel(s.work__text, 'text text_type_main-medium', 'mb-6')}>В работе:</p>
                    <div className={sel(s.number__box)}>
                        {allOrders?.map(order => {
                            if (!(order.status === 'done')) {
                                return (
                                    <p className={sel(s.order__number, 'text text_type_digits-default')} key={order._id}>{order.number}</p>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className={s.done__all}>
                <p className={sel(s.done__title, 'text text_type_main-medium')}>Выполнено за все время:</p>
                <p className={sel(s.done__number, 'text text_type_digits-large')}>{totalOrders}</p>
            </div>
            <div className={s.done__today}>
                <p className={sel(s.done__title, 'text text_type_main-medium')}>Выполнено за сегодня:</p>
                <p className={sel(s.done__number, 'text text_type_digits-large')}>{totalTodayOrders}</p>
            </div>
        </div>
    )
}