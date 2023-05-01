
import s from './style.module.css';
import sel from 'classnames';
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { TIngredient } from '../../utils/types';



export const IngredientDetails = () => {
    const params = useParams();
    const ingredientID = params.id;

    const ingredients = useSelector<RootState>(state => state.ingredientsStore.data) as TIngredient[];
    const currentIngredient: TIngredient | undefined = ingredients?.find(item => `${item._id }`=== ingredientID) 

    return (
        <div className={sel(s.details__container, 'pl-15', 'pr-15')}>
            <img className={sel(s.image, 'ml-5', 'mr-5', 'mb-4')} src={currentIngredient?.image} alt={currentIngredient?.name} />
            <h2 className={sel(s.title, 'text text_type_main-medium')}>{currentIngredient?.name}</h2>
            <ul className={s.calories}>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Калории,ккал</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.calories}</p>
                </li>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Белки, г</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.proteins}</p>
                </li>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Жиры, г</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.fat}</p>
                </li>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Углеводы, г</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{currentIngredient?.carbohydrates}</p>
                </li>
            </ul>

        </div>
    )
}

