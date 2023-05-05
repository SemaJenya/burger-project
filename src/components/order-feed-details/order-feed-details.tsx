
import sel from 'classnames';
import s from './style.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelect } from '../../services/hooks';
import { relative } from 'path';
import { OrderBurgerComposition } from '../order-burger-composition/order-burger-composition';



export const OrderFeedDetails = () => {

    const today = new Date()
    const fiveDaysAgo = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 5,
    today.getHours(),
    today.getMinutes() - 1,
    0,
  )

  const { ingredients, bun } = useSelect(state => state.constructorStore);
  const quantity: number = ingredients.length;
 
    return (
        <div className={sel(s.order__container, 'custom-scroll')}>
            <div className={s.order__box}>
                <div className={sel(s.order__id)}>
                    <p className={sel(s.order__number, 'text text_type_digits-default')}>Order number</p>
                    <FormattedDate date={new Date(fiveDaysAgo)} className={sel(s.order__date, 'text text_type_main-default', 'text_color_inactive')}/>
                </div>
                <h3 className={sel(s.order__name, 'text text_type_main-medium')}>Название заказа Супер булка</h3>
                <div className={sel(s.burger__info)}>
                    <div>
                        {bun &&
                        <div className={sel(s.burger__content)}>
                                <div className={s.ingredient} style={{position: 'absolute', top: 0, left: 0, zIndex: 0}} >
                                <img className={s.image} src={bun.image} /> 
                            </div>   
                            
                        </div>}

                        <div className={sel(s.burger__content)}>
                            {ingredients?.map((data, index) => {
                                let zindex = quantity - index;
                                let left = 50 * zindex;
                                return (
                                <div className={s.ingredient} style={{position: 'absolute', top: 0, left: `${left}px`, zIndex: zindex}} >
                                <img className={s.image} src={data.image} /> 
                            </div>   
                            )})}
                        </div>
                    </div>

                    <div>
                        <p className={sel(s.burger__price, 'text text_type_digits-default')}>12345 
                            <CurrencyIcon type="primary" />
                        </p>
                    </div>                  
                </div>
            </div>
            <div className={s.order__box}>
                <div className={sel(s.order__id)}>
                    <p className={sel(s.order__number, 'text text_type_digits-default')}>Order number</p>
                    <FormattedDate date={new Date(fiveDaysAgo)} className={sel(s.order__date, 'text text_type_main-default', 'text_color_inactive')}/>
                </div>
                <h3 className={sel(s.order__name, 'text text_type_main-medium')}>Название заказа Супер булка</h3>
                <div className={sel(s.burger__info)}>
                    <div className={sel(s.burger__content)}>
                        <p>Cодержимое бургера</p>
                    </div>
                    <div>
                        <p className={sel(s.burger__price, 'text text_type_digits-default')}>12345 
                            <CurrencyIcon type="primary" />
                        </p>
                    </div>                  
                </div>
            </div>       
        </div>
        
    )
}