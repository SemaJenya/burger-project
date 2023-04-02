import { Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import s from './style.module.css';
import sel from 'classnames';
import { OrderDetails } from '../order-details';
import image from '../../images/icon.svg';
import { Modal } from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import burger from '../../images/burger.jpg'
import { fetchOrder } from '../../services/reducers/orederDetails';
import { useDrop } from 'react-dnd';
import { createConstructor } from '../../services/reducers/constructor';
import { counter } from '../app';
import { ElementInConctructor } from '../element-in-constructor';




export const BurgerConstructor = () => {

    // const [bunTop, setBunTop] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    // const [bunBottom, setBunBottom] = useState("https://code.s3.yandex.net/react/code/bun-02.png");
    
    const [isClick, setIsClick] = useState(false);

    const {ingredients, bun} = useSelector(state => state.constructorStore); //достаем данные из стора

    const ingredientsID = ingredients?.map((item) => item._id)

    const calculateSum = (ingredients, bun) => {
        let sum = 0;
        if(bun) {
            sum += bun.price * 2;
        }
        if(ingredients.length > 0) {
            ingredients.map((item) => sum += item.price);
        }
        return sum;
    }
    
    const finalPrice = useMemo(() => calculateSum(ingredients, bun))

    const dispatch = useDispatch();

    const {isLoading} = useSelector(state => state.orderStore)


    const handleClickButton = () => {
        setIsClick(!isClick);
        dispatch(fetchOrder(ingredientsID));
    }

    const handleCounter = (data) => {
        if (!bun && data.type == 'bun') {
            counter[data._id] += 2
        }
        if (bun && data.type == 'bun'){
            console.log(`current bun id ${bun._id}`)
            console.log(`updated bun id ${data._id}`)
            counter[bun._id] = 0
            console.log(`set 0 to ${bun._id}`)
            counter[data._id] += 2
        }      
    }

   
     const [{isHover}, dropTargetRef] = useDrop({
        accept: 'ingredient',
        drop(data, monitor) {
            handleCounter(data.data)
            dispatch(createConstructor(data.data))
            // counter[data.data._id] += 1
            // console.log(data.data);
            

        },
        hover(itemID, monitor) {
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const borderColor = isHover ? 'rgba(100, 100, 100, 0.5)' : 'transparent'

    return (
        <section className={s.constructor__container}>
             <div className={sel(s.constructor__list, 'mt-25', 'mr-4', 'ml-4')}>
                <div className={s.fixed__part}>
                    <ConstructorElement
                        {...bun}
                        type="top"
                        isLocked={true}
                        text={bun? `${bun.name} верх` : 'Выберете булку'}
                        price={bun?.price}
                        thumbnail={bun ? bun.image : burger}
                        key='top'
                    />
                </div>
                   
                <div className={sel(s.constructor__inside, 'custom-scroll')} ref={dropTargetRef} style={{borderColor}}>
                {ingredients?.map((data, index) => data.type !== 'bun' &&
                        <ElementInConctructor data={data} index={index} key={data.randomId}/> 
                    )}               
                </div> 


                <div className={s.fixed__part}>
                    <ConstructorElement
                        {...bun}
                        type="bottom"
                        isLocked={true}
                        text={bun? `${bun.name} низ` : 'Выберете булку'}
                        price={bun?.price}
                        thumbnail={bun ? bun.image : burger}
                        key='buttom'
                    />
                </div>                   
            </div>
            <div className={sel(s.cost_container, 'mt-10', 'mr-4', 'ml-4')}>
                <p className={sel(s.cost_total, 'text text_type_digits-medium', 'mr-2')}>{finalPrice}</p>
                <img className={sel(s.icon, 'mr-10')} src={image} alt='иконка валюты'/>
                <Button htmlType="button" type="primary" size="large" onClick={handleClickButton}>
                    Оформить заказ
                </Button>
            </div>
            {isClick && !isLoading && <Modal onClose={handleClickButton} title='' setIsClick={setIsClick}>
                <OrderDetails />
            </Modal>}
        </section>
    )
}