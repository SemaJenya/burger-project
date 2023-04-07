import { BurgerConstructor } from "../burger-constructor"
import { BurgerIngredients } from "../burger-ingredients"
import s from './style.module.css'


export const MainPage = () => {
    return (
        <main className={s.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    )
}