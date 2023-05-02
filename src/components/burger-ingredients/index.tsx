import { useEffect, useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { IngredientCategory } from '../ingredient-category';
import { useInView } from 'react-intersection-observer';
import { SerializedError } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { useSelect } from '../../services/hooks';


type TInitialState = {
    data: TIngredient[];
    isLoading: boolean;
    error: SerializedError | null;
}



export const BurgerIngredients = () => {

    const {data: ingredients, isLoading} = useSelect(state => state.ingredientsStore) as TInitialState//достаем данные из стора

    const [current, setCurrent] = useState('bun');
    const bunsList = ingredients.filter(item=> item.type === 'bun');
    const mainList = ingredients.filter(item => item.type === 'main');
    const sauceList = ingredients.filter(item => item.type === 'sauce');

    const handleClickTab = (tab: string) => {
        setCurrent(tab);
        const title = document.getElementById(tab);
        if (title) title.scrollIntoView({behavior: 'smooth'});
    }
    
    const [ refSauce, inViewSauce ] = useInView();

    const [ refMain, inViewMain ] = useInView();

    const [ refBun, inViewBun ] = useInView();

    useEffect(() => {
        if(inViewBun){
            setCurrent('bun')

        }
        else if (inViewSauce) {
            setCurrent('sauce')
        }
        else if(inViewMain) {
            setCurrent('main')
        }
    }, [inViewSauce, inViewMain, inViewBun ])



    const ingredient = useSelect(state => state.ingredientDetailsStore.ingredient) as TIngredient | null;


   


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
                    id='bun'
                    ref={refBun}/>
                <IngredientCategory 
                    title={'Соусы'} 
                    ingredients={sauceList}
                    id='sauce'
                    ref={refSauce}/>
                <IngredientCategory 
                    title={'Начинки'} 
                    ingredients={mainList}
                    id='main'
                    ref={refMain}/>
            </div>
{/* 
            {ingredient && <Modal title='Детали ингредиента' onClose={closeIngredientModal}>
                <IngredientDetails />
            </Modal>} */}
        </section>)      
    )
    
}
