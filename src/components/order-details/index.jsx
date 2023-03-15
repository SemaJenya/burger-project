import s from './style.module.css';
import sel from 'classnames';
import image from '../../images/icon.svg';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderDetails = () => {
    return (
        <div className={sel(s.cost_container, 'mt-10', 'mr-4', 'ml-4')}>
                <p className={sel(s.cost_total, 'text text_type_digits-medium', 'mr-2')}>610</p>
                <img className={sel(s.icon, 'mr-10')} src={image} alt='иконка валюты'/>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
         </div>
    )
}