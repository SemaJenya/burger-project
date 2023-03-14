import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { IngredientCategory } from '../ ingredient-category';



export const BurgerIngredients = ({ ingredients }) => {


    const [current, setCurrent] = useState('Булки');
    const bunsList = ingredients.filter(item => item.type === 'bun');
    const mainList = ingredients.filter(item => item.type === 'main');
    const sauceList = ingredients.filter(item => item.type === 'sauce');

    return (
        <section className={sel(s.ingredients__conteiner, 'mr-10')}>
            <h1 className={sel(s.title, 'text text_type_main-large', 'mt-10', 'mb-5')}>Соберите бургер</h1>
            <div className={sel(s.ingredients, 'mb-10')}>
                <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={s.category__box}>
                <IngredientCategory 
                    title={'Булки'} 
                    ingredients={bunsList}
                    id={bunsList._id}/>
                <IngredientCategory 
                    title={'Соусы'} 
                    ingredients={sauceList}
                    id={sauceList._id}/>
                <IngredientCategory 
                    title={'Начинки'} 
                    ingredients={mainList}
                    id={mainList._id}/>
            </div>
            
        </section>
    )
}