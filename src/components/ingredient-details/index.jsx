import s from './style.module.css';
import sel from 'classnames';


export const IngredientDetails = ({data}) => {
    return (
        <div className={sel(s.details__container, 'pl-15', 'pr-15')}>
            <img className={sel(s.image, 'ml-5', 'mr-5', 'mb-4')} src={data.image} alt={data.name} />
            <h2 className={sel(s.title, 'text text_type_main-medium')}>{data.name}</h2>
            <ul className={s.calories}>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Калории,ккал</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{data.calories}</p>
                </li>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Белки, г</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{data.proteins}</p>
                </li>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Жиры, г</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{data.fat}</p>
                </li>
                <li className={s.nutrients}>
                    <p className={sel( s.nutrients__type ,'text text_type_main-default text_color_inactive')}>Углеводы, г</p>
                    <p className={sel(s.nutrients__quantity, 'text text_type_digits-default text_color_inactive')}>{data.carbohydrates}</p>
                </li>
            </ul>

        </div>
    )
}