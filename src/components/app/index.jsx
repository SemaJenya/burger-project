import { useEffect, useState } from 'react'
import { AppHeader } from '../app-header'
import { BurgerConstructor } from '../burger-constructor'
import { BurgerIngredient } from '../burger-ingredient'
import s from './style.module.css'
import { getIngredients } from '../../utils/api'
import sel from 'classnames'
import { BurgerIngredients } from '../burger-ingredients'
import { useDispatch } from 'react-redux'
import { fetchIngredients } from '../../services/reducers/ingredients'

export const App = () => {

// const [ingredients, setIngredients] = useState([]);
const dispatch = useDispatch()

useEffect(() => {
    dispatch(fetchIngredients())
}, [dispatch])


    return(
    <div className={s.app}>
        <AppHeader />
        <main className={s.main}>
            <BurgerIngredients />
            <BurgerConstructor />
        </main>
    </div>
    )
}