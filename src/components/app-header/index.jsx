
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'

export const AppHeader = () => {
    return (
        <header className={s.header}>
            <nav className={s.nav}>
                <Logo />
            </nav>
        </header>
    )
    
}