import s from './style.module.css';
import sel from 'classnames';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientDetails = ({constructor}) => {
    return (
        <div className={sel(s.constructor__inside, 'custom-scroll')}>
            {constructor?.map(data => 
                <div className={s.inside__item} key={`${data._id} div`}>
                    <DragIcon type="primary" key={`${data._id} icon`}/>
                    <ConstructorElement
                        text={data.name}
                        price={data.price}
                        thumbnail={data.image}
                        key={data._id}/> 
                </div>)}                   
        </div> 
    )
}