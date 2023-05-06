
import sel from 'classnames';
import s from './style.module.css';
import { TIngredient } from '../../utils/types';

type TOrderBurgerComposition = {
    data: TIngredient;
    index: number;
    allIngredients: (TIngredient |null) [];
    MAX_VIEW_INGREDIENT: number;
    zindex: number;
    right: number;
}

export const OrderBurgerComposition: React.FC<TOrderBurgerComposition> = ( {data, index, allIngredients, MAX_VIEW_INGREDIENT, zindex, right }) => {

        return (
            <div className={s.ingredient} style={{ position: 'relative', top: 0, right: `${right}px`, zIndex: zindex }} key={`${data.randomId}`}>
                {data && <img className={s.image} src={data.image} />}

                {MAX_VIEW_INGREDIENT === index + 1 && (allIngredients.length - MAX_VIEW_INGREDIENT) > 0 ? (
                    <span className={sel(s.span__plus, 'text text_type_main-small')}>+{(allIngredients.length - MAX_VIEW_INGREDIENT) > 0 ? (allIngredients.length - MAX_VIEW_INGREDIENT) : null}</span>
                ) : null}
            </div>
        )
}