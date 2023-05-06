
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { useSelect } from '../../services/hooks';
import { useMemo } from 'react';
import { TIngredient } from '../../utils/types';



export const OrderFeedID = () => {

    const { ingredients, bun } = useSelect(state => state.constructorStore);
    const allIngredients = [bun, ...ingredients];

    const { counter} = useSelect(state => state.counterStore);

    const today = new Date()
    const fiveDaysAgo = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 5,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    )

    const calculateSum = (ingredients: TIngredient[], bun: TIngredient | null) => {   // потом сумма будет браться с сервера
        let sum = 0;
        if(bun && bun.price) {
            sum += bun?.price * 2;
        }
        if(ingredients.length > 0) {
            ingredients.map((item) => {
                if(item.price) {
                    sum += item.price
                }
            });
        }
        return sum;
    }
    const finalPrice: number = useMemo(() => calculateSum(ingredients, bun), [ingredients, bun])
    

    return (
        <section className={s.orderID__page}>
            <div className={s.content__container}>
                <p className={sel(s.order__number, 'text text_type_digits-default', 'mb-10')}>#12345</p>
                <p className={sel(s.order__name, 'text text_type_main-medium', 'mb-3')}>Order Name Buger</p>
                <p className={sel(s.order__status, 'text text_type_main-small', 'mb-15')}>Status ready</p>
                <p className={sel(s.order__content, 'text text_type_main-medium', 'mb-6')}>Cостав:</p>
                <ul className={sel(s.content, 'custom-scroll')}>
                    {allIngredients?.map(data => {
                        if (data) {
                            return (
                                <li className={s.ingedient__info} key={data.randomId}>
                                    <div className={s.image__box} key={data?.randomId}>
                                        {data && <img className={s.image} src={data.image} key={data?.randomId}/>}
                                    </div>
                                    <p className={sel(s.ingredient__name, 'text text_type_main-default')}>{data.name}</p>
                                    <div className={s.quantity__coast}>
                                        <p className={sel(s.quantity, 'text text_type_digits-default')}>
                                            {`${counter[data._id].count} x ${data.price}`}
                                        </p>
                                        <CurrencyIcon type="primary"/> 
                                    </div>
                                </li>)
                        }
                    })}
                </ul>
                <div className={s.date__cost}>
                    <FormattedDate date={new Date(fiveDaysAgo)} className={sel(s.order__date, 'text text_type_main-default', 'text_color_inactive')} />
                    
                    <p className={sel(s.order__coast, 'text text_type_digits-default')}>{finalPrice} <CurrencyIcon type="primary"/> </p>
                </div>
            </div>
        </section>
    )
}