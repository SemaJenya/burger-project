import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import s from './style.module.css';
import sel from 'classnames';



export const BurgerConstructor = ({constructor}) => {

    const [bunTop, setBunTop] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    const [bunBottom, setBunBottom] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    
  

    return (
        <section className={s.constructor__container}>
             <div className={sel(s.constructor__list, 'mt-25')}>
                <div className={s.fixed__part}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={bunTop}
                    />
                </div>              
                <div className={sel(s.constructor__inside, 'custom-scroll')}>
                    {constructor?.map(data => 
                    <div className={s.inside__item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={data.name}
                            price={data.price}
                            thumbnail={data.image}
                            key={data._id}
                        /> 
                    </div>)}
                </div>   
                <div className={s.fixed__part}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail={bunBottom}
                    />
                </div>                      
            </div>
            <div className={s.cost_container}>
                <p className={s.cost_total}>610 <CurrencyIcon type="primary" /></p>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}