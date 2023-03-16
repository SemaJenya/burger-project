
import s from './style.module.css'
import sel from 'classnames'
import { BurgerIngredient } from '../burger-ingredient'
import { Modal } from '../modal'
import { useState } from 'react'
import { IngredientDetails } from '../ingredient-details'

export const IngredientCategory = ({title, ingredients, id}) => {
    const [ingredientInModal, setIngredientInModal] = useState(null);
    console.log(ingredientInModal);
  
    return (
        <>
            <h2 className={sel(s.title, "text_type_main-medium")} id={id}>{title}</h2>
            <div className={s.category__list}>
                {ingredients?.map(data => <BurgerIngredient {...data} count={1} key={data._id} onClick={setIngredientInModal}/>)}
            </div>
            {ingredientInModal && <Modal title='Детали ингредиента'><IngredientDetails data={ingredientInModal} /></Modal>}
        </>
    )
}