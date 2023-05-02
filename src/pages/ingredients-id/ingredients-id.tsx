
import sel from 'classnames';
import s from './style.module.css';
import { IngredientDetails } from '../../components/ingredient-details';



export const IngredientsID = () => {

    return (
        <div className={s.page}>
            <div className={s.container}>
                <h2 className={sel(s.title, 'text text_type_main-large')}>Детали ингредиента</h2>
                <IngredientDetails />      
            </div>        
       </div>
    )
}