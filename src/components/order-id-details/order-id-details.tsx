import { v4 as uuidv4 } from 'uuid';
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderFeedDetails } from '../../components/order-feed-details/order-feed-details';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { useSelect } from '../../services/hooks';
import { useMemo } from 'react';
import { TIngredient } from '../../utils/types';
import { TOrder } from '../../services/reducers/order-feed-live/reducers';
import { useParams } from 'react-router-dom';

type TOrderIdDetails = {
    currentOrder?: TOrder;
}

export const OrderIdDetails: React.FC<TOrderIdDetails> = () => {


    const params = useParams();
    
    const orderNumber = params.id;

    const { orders } = useSelect(state => state.liveOrdersStore);
    const currentOrder: TOrder | undefined = orders?.orders?.find(item => `${item.number}` === orderNumber)

    const { data } = useSelect(state => state.ingredientsStore)


    let ingredientsInOrder: TIngredient[] = new Array(); //ингредиенты все в заказе массив объектов для подсчета стоимости и вычисления их количества
    data.forEach(ingredient => {
        currentOrder?.ingredients.forEach(orderIngredient => {
            if (ingredient._id === orderIngredient) {
                const arrlength = ingredientsInOrder.push({ ...ingredient, randomId: uuidv4() })
            }
        })
    })


    function unique(arr: string[] | undefined) {  //находим уникальние ингредиенты для отображение в заказе
        let result: string[] | undefined = [];
        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                if (!result.includes(arr[i])) {
                    result.push(arr[i]);
                }
            }

            return result;
        }
    }
    const uniqueIngredient = unique(currentOrder?.ingredients);

    let uniqueIngredientsInOrder: TIngredient[] = new Array();
    data.forEach(ingredient => {
        uniqueIngredient?.forEach(orderIngredient => {
            if (ingredient._id === orderIngredient) {
                const arrlength = uniqueIngredientsInOrder.push({ ...ingredient, randomId: uuidv4() })
            }
        })
    })

    const calculateSum = (ingredientsInOrder: TIngredient[]) => {
        let sum = 0;
        if (ingredientsInOrder.length > 0) {
            ingredientsInOrder.map((item) => {
                if (item.price) {
                    sum += item.price
                }
            });
        }
        return sum;
    }

    const finalPrice: number = useMemo(() => calculateSum(ingredientsInOrder), [ingredientsInOrder])

    return (
        <>
            <p className={sel(s.order__name, 'text text_type_main-medium', 'mb-3')}>{currentOrder?.name}</p>
            <p className={sel(s.order__status, 'text text_type_main-small', 'mb-15')}>{currentOrder?.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
            <p className={sel(s.order__content, 'text text_type_main-medium', 'mb-6')}>Cостав:</p>
            <ul className={sel(s.content, 'custom-scroll')}>
                {uniqueIngredientsInOrder?.map(data => {
                    const count = ingredientsInOrder.filter(item => item._id === data._id).length;

                    if (data) {
                        return (
                            <li className={s.ingedient__info} key={data.randomId}>
                                <div className={s.image__box} key={data?.randomId}>
                                    {data && <img className={s.image} src={data.image} key={data?.randomId} />}
                                </div>
                                <p className={sel(s.ingredient__name, 'text text_type_main-default')}>{data.name}</p>
                                <div className={s.quantity__coast}>
                                    <p className={sel(s.quantity, 'text text_type_digits-default')}>
                                        {`${count} x ${data.price}`}
                                    </p>
                                    <CurrencyIcon type="primary" />
                                </div>
                            </li>)
                    }
                })}
            </ul>
            <div className={s.date__cost}>
                {currentOrder && <FormattedDate date={new Date(currentOrder.createdAt)} className={sel(s.order__date, 'text text_type_main-default', 'text_color_inactive')} />}

                <p className={sel(s.order__coast, 'text text_type_digits-default')}>{finalPrice} <CurrencyIcon type="primary" /> </p>
            </div>
        </>
    )
}