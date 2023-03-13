
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'
import sel from 'classnames'

export const AppHeader = () => {
    return (
        <header className={s.header}>
            <nav className={sel(s.nav, 'p-4')}>
                <div className={s.nav__box}>
                    <a className={sel(s.link, s.link__active, 'pl-5', 'pr-5', 'pt-4', 'pb-4', 'mr-2')} href='#'>
                        <BurgerIcon type="primary"/>
                        <span className='text text_type_main-default ml-2'>Конструктор</span>
                    </a>
                    <a className={sel(s.link, s.link__active, 'pl-5', 'pr-5', 'pt-4', 'pb-4')} href='#'>
                        <ListIcon type="secondary" />
                        <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
                    </a>
                </div>  
                <div className={sel(s.nav__box, s.logo)}>
                    <Logo />
                </div>                 
                <div className={sel(s.nav__box, s.nav__box_right)}>
                    <a className={sel(s.link, s.link__active, 'pl-5', 'pr-5', 'pt-4', 'pb-4')} href='#'>
                        <ProfileIcon type="secondary" />
                        <span className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</span>
                    </a>
                </div>           
            </nav>
        </header>
    )
    
}