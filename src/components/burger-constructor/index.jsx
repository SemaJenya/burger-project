import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import s from './style.module.css';
import sel from 'classnames';
import { OrderDetails } from '../order-details';
import { IngredientDetails } from '../ingredient-details';



export const BurgerConstructor = ({constructor}) => {

    const [bunTop, setBunTop] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    const [bunBottom, setBunBottom] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    
  

    return (
        <section className={s.constructor__container}>
             <div className={sel(s.constructor__list, 'mt-25', 'mr-4', 'ml-4')}>
                <div className={s.fixed__part}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={bunTop}
                        key='top'
                    />
                </div>              
                <IngredientDetails constructor={constructor} />  
                <div className={s.fixed__part}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={bunBottom}
                        key='buttom'
                    />
                </div>                      
            </div>
            <OrderDetails />
        </section>
    )
}