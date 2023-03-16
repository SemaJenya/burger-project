import s from './style.module.css';
import sel from 'classnames';


export const IngredientDetails = ({data}) => {
    return (
        <div className={s.details__container}>
            <img className={s.image} src={data.image} alt={data.name} />
            <h2 className={s.title}>{data.name}</h2>
            <ul className={s.calories}>
                <li>
                    <p>Калории, ккал</p>
                    <p>{data.calories}</p>
                </li>
                <li>
                    <p>Белки, г</p>
                    <p>{data.proteins}</p>
                </li>
                <li>
                    <p>Жиры, г</p>
                    <p>{data.fat}</p>
                </li>
                <li>
                    <p>Углеводы, г</p>
                    <p>{data.carbohydrates}</p>
                </li>
            </ul>

        </div>
    )
}