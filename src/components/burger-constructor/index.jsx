import { Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import PropTypes from 'prop-types';
import s from './style.module.css';
import sel from 'classnames';
import { OrderDetails } from '../order-details';
import { IngredientDetails } from '../ingredient-details';
import image from '../../images/icon.svg';
import { Modal } from '../modal';
import { ingredientsPropType } from '../../utils/prop-type';
import { useSelector } from 'react-redux';



export const BurgerConstructor = () => {

    const [bunTop, setBunTop] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    const [bunBottom, setBunBottom] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    
    const [isClick, setIsClick] = useState(false);

    const {ingredients: constructor, bun} = useSelector(state => state.constructorStore) //достаем данные из стора

    const hendleClickButton = () => {
        setIsClick(!isClick)
    }


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
                {!constructor ? <div>Добавьте игредиенты</div> :     
                <div className={sel(s.constructor__inside, 'custom-scroll')}>
                {constructor?.map(data => data.type !== 'bun' &&
                    <div className={s.inside__item} key={`${data._id} div`}>
                        <DragIcon type="primary" key={`${data._id} icon`}/>                       
                        <ConstructorElement
                          text={data.name}
                          price={data.price}
                          thumbnail={data.image}
                          key={data._id}/> 
                    </div>)}                   
                </div> }  
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
            <div className={sel(s.cost_container, 'mt-10', 'mr-4', 'ml-4')}>
                <p className={sel(s.cost_total, 'text text_type_digits-medium', 'mr-2')}>610</p>
                <img className={sel(s.icon, 'mr-10')} src={image} alt='иконка валюты'/>
                <Button htmlType="button" type="primary" size="large" onClick={hendleClickButton}>
                    Оформить заказ
                </Button>
            </div>
            {isClick && <Modal onClose={hendleClickButton} title='' setIsClick={setIsClick}>
                <OrderDetails />
            </Modal>}
        </section>
    )
}