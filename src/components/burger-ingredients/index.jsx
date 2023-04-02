import { useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';
import { IngredientCategory } from '../ingredient-category';
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientDetails, removeIngredientDetails } from '../../services/reducers/ingredientDetails';



export const BurgerIngredients = () => {

    const {data: ingredients, isLoading, error} = useSelector(state => state.ingredientsStore) //достаем данные из стора

    const [current, setCurrent] = useState('bun');
    const bunsList = ingredients.filter(item => item.type === 'bun');
    const mainList = ingredients.filter(item => item.type === 'main');
    const sauceList = ingredients.filter(item => item.type === 'sauce');

    const handleClickTab = (tab) => {
        setCurrent(tab);
        const title = document.getElementById(tab);
        if (title) title.scrollIntoView({behavior: 'smooth'});
    }

    const ingredient = useSelector(state => state.ingredientDetailsStore.ingredient)
    const dispatch = useDispatch();

    const closeIngredientModal = () => dispatch(createIngredientDetails(null))

    useEffect(() => {
        const closeModalEsc = (e) => {
            if (e.key === 'Escape') {
                dispatch(createIngredientDetails(null))
            }         
        }
        document.addEventListener('keydown', closeModalEsc)

        return () => document.addEventListener('keydown', closeModalEsc)
    }, [])

   

    return ( isLoading ? <div>Loading...</div> :
        (<section className={sel(s.ingredients__conteiner, 'mr-10')}>
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
            {ingredient && <Modal title='Детали ингредиента' onClose={closeIngredientModal}>
                <IngredientDetails />
            </Modal>}
        </section>)
    )
}
