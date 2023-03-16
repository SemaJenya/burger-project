
import s from './style.module.css'
import sel from 'classnames'
import { BurgerIngredient } from '../burger-ingredient'

export const IngredientCategory = ({title, ingredients, id, onClick}) => {
    
  
    return (
        <>
            <h2 className={sel(s.title, "text_type_main-medium")} id={id}>{title}</h2>
            <div className={s.category__list}>
                {ingredients?.map(data => <BurgerIngredient {...data} count={1} key={data._id} onClick={onClick}/>)}
            </div>          
        </>
    )
}