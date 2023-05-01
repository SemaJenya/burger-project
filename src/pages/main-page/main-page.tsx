import { BurgerConstructor } from '../../components/burger-constructor';
import { BurgerIngredients } from '../../components/burger-ingredients'
import s from './style.module.css'


export const MainPage = () => {
    return (
        <main className={s.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}