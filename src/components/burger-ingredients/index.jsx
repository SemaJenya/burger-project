import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { IngredientCategory } from '../ ingredient-category';



export const BurgerIngredients = ({ ingredients }) => {

    const [current, setCurrent] = useState('bun');
    const bunsList = ingredients.filter(item => item.type === 'bun');
    const mainList = ingredients.filter(item => item.type === 'main');
    const sauceList = ingredients.filter(item => item.type === 'sauce');

    const handleClickTab = (tab) => {
        setCurrent(tab);
        console.log(tab);
        const title = document.getElementById(tab);
        console.log(title);
        if (title) title.scrollIntoView({behavior: 'smooth'});
    }
    return (
        <section className={sel(s.ingredients__conteiner, 'mr-10')}>
            <h1 className={sel(s.title, 'text text_type_main-large', 'mt-10', 'mb-5')}>Соберите бургер</h1>
            <div className={sel(s.ingredients, 'mb-10')}>
                <Tab value="bun" active={current === 'bun'} onClick={handleClickTab}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={handleClickTab}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={handleClickTab}>
                    Начинки
                </Tab>
            </div>
            <div className={sel(s.category__box, 'custom-scroll')}>
                <IngredientCategory 
                    title={'Булки'} 
                    ingredients={bunsList}
                    id='bun'/>
                <IngredientCategory 
                    title={'Соусы'} 
                    ingredients={sauceList}
                    id='sauce'/>
                <IngredientCategory 
                    title={'Начинки'} 
                    ingredients={mainList}
                    id='main'/>
            </div>
            
        </section>
    )
}