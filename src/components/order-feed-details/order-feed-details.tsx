
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelect } from '../../services/hooks';
import { relative } from 'path';
import { OrderBurgerComposition } from '../order-burger-composition/order-burger-composition';
import { Link, useLocation } from 'react-router-dom';
import { TIngredient } from '../../utils/types';
import { useMemo } from 'react';



export const OrderFeedDetails = () => {
    
    const location = useLocation();
    const MAX_VIEW_INGREDIENT = 6;
    const today = new Date()
    const fiveDaysAgo = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 5,
        today.getHours(),
        today.getMinutes() - 1,
        0,
    )
    const orderNumber = '494975';
    const orderName = 'Название заказа Супер булка';

    const { ingredients, bun } = useSelect(state => state.constructorStore);
    const allIngredients=[bun, ...ingredients];
    const ingredientsToShow = allIngredients.slice(0, MAX_VIEW_INGREDIENT);


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
        <div className={sel(s.order__container, 'custom-scroll')}>
            <Link to={{pathname: `${orderNumber}`}} className={s.order__box} state={{background: location}}>
                <div className={sel(s.order__id)}>
                    <p className={sel(s.order__number, 'text text_type_digits-default')}>{orderNumber}</p>
                    <FormattedDate date={new Date(fiveDaysAgo)} className={sel(s.order__date, 'text text_type_main-default', 'text_color_inactive')} />
                </div>
                <h3 className={sel(s.order__name, 'text text_type_main-medium')}>{orderName}</h3>
                <div className={sel(s.burger__info)}>

                    <div className={sel(s.burger__content)}>
                        {ingredientsToShow?.map((data, index) => {
                             let zindex = MAX_VIEW_INGREDIENT - index;
                             let right = 20 * index;
                            if(data) {
                                return(<OrderBurgerComposition 
                                    data={data} 
                                    index={index} 
                                    allIngredients={allIngredients} 
                                    MAX_VIEW_INGREDIENT={MAX_VIEW_INGREDIENT} 
                                    zindex={zindex} 
                                    right={right}
                                    key={data.randomId} />)
                            }                            
                        })}
                    </div>

                    <div className={s.cost}>
                        <p className={sel(s.burger__price, 'text text_type_digits-default')}>{finalPrice}
                            <CurrencyIcon type="primary" />
                        </p>
                    </div>
                </div>
            </Link>
        </div>

    )
}