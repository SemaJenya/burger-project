
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { useSelect } from '../../services/hooks';
import { useMemo } from 'react';
import { TIngredient } from '../../utils/types';
import { OrderIdDetails } from '../../components/order-id-details/order-id-details';



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
                <OrderIdDetails />            
            </div>
        </section>
    )
}