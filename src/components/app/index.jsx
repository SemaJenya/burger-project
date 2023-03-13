import { useEffect, useState } from 'react'
import { AppHeader } from '../app-header'
import { BurgerConstructor } from '../burger-constructor'
import { BurgerIngredient } from '../burger-ingredient'
import s from './style.module.css'
import { getIngredients } from '../../utils/api'

export const App = () => {

const [ingredients, setIngredients] = useState();

useEffect(() => {
    getIngredients()
    .then(data => {
        setIngredients(data);
    })
}, [])

    return(
    <div className={s.app}>
        <AppHeader />
        <main className={s.main}>
            <BurgerIngredient ingredients={ingredients}/>
            <BurgerConstructor constructor={ingredients}/>
        </main>
    </div>
    )
}