import { v4 as uuidv4 } from 'uuid';
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelect } from '../../services/hooks';
import { OrderBurgerComposition } from '../order-burger-composition/order-burger-composition';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useMemo } from 'react';
import { TOrder } from '../../services/reducers/order-feed-live/reducers';

type TOrderFeedDetails = {
    order: TOrder;
}

export const OrderFeedDetails: React.FC<TOrderFeedDetails> = ({ order }) => {

    const { data } = useSelect(state => state.ingredientsStore)

    let ingredientsInOrder = new Array();

    data.forEach(ingredient => {
        order.ingredients.forEach(orderIngredient => {
            if (ingredient._id === orderIngredient) {
                const arrlength = ingredientsInOrder.push({ ...ingredient, randomId: uuidv4() })
            }
        })
    })

    const location = useLocation();
    
    const MAX_VIEW_INGREDIENT = 6;

    const orderNumber = order.number;
    const orderName = order.name;
    

    const ingredientsToShow = ingredientsInOrder.slice(0, MAX_VIEW_INGREDIENT);


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

    const status = () => {
        if(order.status === 'done') {
            return 'Выполнен'
        }
        if(order.status === 'created') {
            return 'Создан'
        }
        if(order.status === 'pending') {
            return 'Готовится'
        }
    }

    const finalPrice: number = useMemo(() => calculateSum(ingredientsInOrder), [ingredientsInOrder])

    return (

        <Link to={{ pathname: `${orderNumber}` }} className={s.order__box} state={{ background: location }} key={order._id}>
            <div className={sel(s.order__id)}>
                <p className={sel(s.order__number, 'text text_type_digits-default')}>{orderNumber}</p>
                <FormattedDate date={new Date(order.createdAt)} className={sel(s.order__date, 'text text_type_main-default', 'text_color_inactive')} />
            </div>
            <h3 className={sel(s.order__name, 'text text_type_main-medium')}>{orderName}</h3>
            {location.pathname === '/profile/orders' ? <p id='orderStatus' style={!(order.status === 'done') ? {color: 'white'} : {color: 'rgba(0, 204, 204, 1)'}} className={sel(s.order__status, 'text text_type_main-small')}>{status()}</p> : ''}

            <div className={sel(s.burger__info)}>

                <div className={sel(s.burger__content)} key={`${order._id}`}>
                    {ingredientsToShow?.map((data: TIngredient, index) => {
                        let zindex = MAX_VIEW_INGREDIENT - index;
                        let right = 20 * index;
                        if (data) {
                            return (<OrderBurgerComposition
                                data={data}
                                index={index}
                                ingredientsInOrder={ingredientsInOrder}
                                MAX_VIEW_INGREDIENT={MAX_VIEW_INGREDIENT}
                                zindex={zindex}
                                right={right}
                                key={`${data?.randomId}`} />)
                        }
                    })}
                </div>

                <div className={s.cost} key={`${order._id} cost`}>
                    <p className={sel(s.burger__price, 'text text_type_digits-default')} >{finalPrice}
                        <CurrencyIcon type="primary" />
                    </p>
                </div>
            </div>
        </Link>
    )
}