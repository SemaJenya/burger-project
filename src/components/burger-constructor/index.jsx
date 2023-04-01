import { Button, ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import s from './style.module.css';
import sel from 'classnames';
import { OrderDetails } from '../order-details';
import { IngredientDetails } from '../ingredient-details';
import image from '../../images/icon.svg';
import { Modal } from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import burger from '../../images/burger.jpg'
import { fetchOrder } from '../../services/reducers/orederDetails';
import { useDrop } from 'react-dnd';
import { createConstructor } from '../../services/reducers/constructor';




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

   
     const [{isHover}, dropTargetRef] = useDrop({
        accept: 'ingredient',
        drop(data, monitor) {

            // console.log('f123');
            // console.log(data.data);
            dispatch(createConstructor(data.data))
        },
        hover(itemID, monitor) {
            console.log('jsjsjs');
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const borderColor = isHover ? 'salmon' : 'transparent'


    // ingredients.forEach(data => {
    //     console.log(data.data)
    // });

    return (
        <section className={s.constructor__container}>
             <div className={sel(s.constructor__list, 'mt-25', 'mr-4', 'ml-4')}>
                <div className={s.fixed__part}>
                    <ConstructorElement
                        {...bun}
                        type="top"
                        isLocked={true}
                        text={bun? bun.name : 'Выберете булку'}
                        price={bun?.price}
                        thumbnail={bun ? bun.image : burger}
                        key='top'
                    />
                </div>
                {!ingredients ? <div>Добавьте игредиенты aaaaaaaaa</div> :     
                (<div className={sel(s.constructor__inside, 'custom-scroll')} ref={dropTargetRef} style={{borderColor}}>
                {ingredients?.map(data => data.type !== 'bun' &&
                    <div className={s.inside__item} key={`${data.randomId} div`} >
                        <DragIcon type="primary" key={`${data.randomId} icon`}/>                       
                        <ConstructorElement
                          text={data.name}
                          price={data.price}
                          thumbnail={data.image}
                          key={data.randomId}/> 
                    </div>)}                   
                </div> )}  
                <div className={s.fixed__part}>
                    <ConstructorElement
                        {...bun}
                        type="bottom"
                        isLocked={true}
                        text={bun? bun.name : 'Выберете булку'}
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