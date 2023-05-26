import { Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './style.module.css';
import sel from 'classnames';
import { OrderDetails } from '../order-details';
import { Modal } from '../modal';
import burger from '../../images/burger.jpg'
import { TOrderState, fetchOrder } from '../../services/reducers/orederDetails';
import { useDrop } from 'react-dnd';
import { TConstructorStore, createConstructor } from '../../services/reducers/constructor';
import { ElementInConctructor } from '../element-in-constructor';
import { addCounter } from '../../services/reducers/counter'
import { RootState } from '../../services/store';
import { TIngredient } from '../../utils/types';
import { useDispatch } from '../../services/hooks';
import { useSelect } from '../../services/hooks'




export const BurgerConstructor = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [isClick, setIsClick] = useState<boolean>(false);

    const order = useSelect(state => state.liveOrdersStore);
    const orderStatus = order.status;
    

    
    const {ingredients, bun} = useSelect(state => state.constructorStore); //достаем данные из стора
    const userDataStore = useSelect(state => state.userStore.data);

    const dataAvailable: boolean = (ingredients.length === 0) ? true : false;

    const ingredientsID = ingredients?.map((item) => item._id);

    const bunID: string = bun ? bun._id : '';

    const ingredientsAndBunID = [bunID, ...ingredientsID, bunID];
    
    const calculateSum = (ingredients: TIngredient[], bun: TIngredient | null) => {
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

    const { isLoading } = useSelect(state => state.orderStore) as TOrderState;


    const handleClickButton = () => {
        if(userDataStore) {
            setIsClick(!isClick);
            dispatch(fetchOrder(ingredientsAndBunID));           
        }
        else {
            navigate('/login');
        }
    };

    const handleClose = () => {
        if(userDataStore) {
            setIsClick(!isClick);       
        }
    };

  
     const [{isHover}, dropTargetRef] = useDrop({
        accept: 'ingredient',
        drop(data:any, monitor) {
            dispatch(createConstructor(data.data));
            dispatch(addCounter(data.data))
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
                   {bun?.price ? <ConstructorElement
                        {...bun}
                        type="top"
                        isLocked={true}
                        text={bun? `${bun.name} верх` : 'Выберете булку'}
                        price={bun ? bun?.price : 0}
                        thumbnail={bun ? bun.image : burger}
                        key='top'
                    /> : 
                    <ConstructorElement
                        {...bun}
                        type="top"
                        isLocked={true}
                        text={bun? `${bun.name} верх` : 'Выберете булку'}
                        price={0}
                        thumbnail={bun ? bun.image : burger}
                        key='top'
                    />}
                </div>

                <div className={sel(s.constructor__inside, 'custom-scroll')} ref={dropTargetRef} style={{borderColor}}>
                {ingredients?.map((data, index) => data.type !== 'bun' &&
                        <ElementInConctructor data={data} index={index} key={data.randomId}/> 
                    )}               
                </div>

                <div className={s.fixed__part}>
                  {bun?.price ? <ConstructorElement
                        {...bun}
                        type="bottom"
                        isLocked={true}
                        text={bun? `${bun.name} низ` : 'Выберете булку'}
                        price={bun?.price}
                        thumbnail={bun ? bun.image : burger}
                        key='buttom'
                    /> :
                    <ConstructorElement
                        {...bun}
                        type="bottom"
                        isLocked={true}
                        text={bun? `${bun.name} низ` : 'Выберете булку'}
                        price={0}
                        thumbnail={bun ? bun.image : burger}
                        key='buttom'
                    />}
                </div>                   
            </div>
            <div className={sel(s.cost_container, 'mt-10', 'mr-4', 'ml-4')} >
                <p className={sel(s.cost_total, 'text text_type_digits-medium', 'mr-2')}>{finalPrice}</p>
                <div className={sel(s.icon, 'mr-10')}>
                     <CurrencyIcon type="primary"/>  
                </div>
                
                <Button htmlType="button" type="primary" size="large" onClick={handleClickButton} disabled={dataAvailable}>
                    Оформить заказ
                </Button>
            </div>
            {isClick && !isLoading && <Modal onClose={handleClose} title=''>
                <OrderDetails />
            </Modal>}
        </section>
    )
}