import { useEffect, useState } from 'react'
import { AppHeader } from '../app-header'
import { BurgerConstructor } from '../burger-constructor'
import { BurgerIngredient } from '../burger-ingredient'
import s from './style.module.css'
import { getIngredients } from '../../utils/api'
import sel from 'classnames'
import { BurgerIngredients } from '../burger-ingredients'

export const App = () => {

const [ingredients, setIngredients] = useState([]);

useEffect(() => {
    getIngredients()
    .then(data => {
        setIngredients(data);
        console.log(data);
    })
    .catch((err) => console.log(err))
}, [])

    return(
    <div className={s.app}>
        <AppHeader />
        <main className={s.main}>
            <BurgerIngredients ingredients={ingredients}/>
            <BurgerConstructor constructor={ingredients}/>
        </main>
    </div>
    )
}