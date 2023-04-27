import { Link, NavLink, useMatch, useParams } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import s from './style.module.css'
import sel from 'classnames'
import { useState } from 'react';

export const AppHeader = () => {

    const activeLink = ({ isActive }: {[key: string]: boolean}) => isActive ? sel(s.active, 'pl-5', 'pr-5', 'pt-4', 'pb-4') : sel(s.link, 'pl-5', 'pr-5', 'pt-4', 'pb-4')
    const [personalAreaIcon, setPersonalAreaIcon] = useState('secondary');
        
    const isProfile = useMatch('/profile')
    const isConstructor = useMatch('/')


    const handleClickPersonalArea = () => {
        setPersonalAreaIcon('primary')
    }


    return (
        <header className={s.header}>
            <nav className={sel(s.nav, 'p-4')}>

                <div className={s.nav__box}>
                    <NavLink to='/' className={activeLink} >
                        <BurgerIcon type={isConstructor? "primary": "secondary"}/>
                        <span className={sel('text text_type_main-default ml-2')}>Конструктор</span>
                    </NavLink>
                    <a className={sel(s.link,  'pl-5', 'pr-5', 'pt-4', 'pb-4')} href='#'>
                        <ListIcon type="secondary" />
                        <span className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</span>
                    </a>
                </div>  

                <Link className={sel(s.nav__box, s.logo)} to='/'>
                    <Logo />
                </Link>                 

                <div className={sel(s.nav__box, s.nav__box_right)}>
                    <NavLink to='/profile' className={activeLink} onClick={handleClickPersonalArea}>            
                            <ProfileIcon type={isProfile? "primary": "secondary"} />
                            <span className={sel('text text_type_main-default ml-2')}>Личный кабинет</span>
                    </NavLink>
                </div>        

            </nav>
        </header>
    )
}

