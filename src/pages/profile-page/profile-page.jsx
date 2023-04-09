import { useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom'


export const ProfilePage = () => {
    const inputRef = useRef(null)

    const [nameValue, setNameValue] = useState('');
    const onChangeName = e => {
        setNameValue(e.target.value);
    }
    const [emailValue, setEmailValue] = useState('password')
    const onChangeEmail = e => {
        setEmailValue(e.target.value);
    }
    const [passwordValue, setPasswordValue] = useState('')
    const onChangePassword = e => {
        setPasswordValue(e.target.value);
    }

    return (
        <div className={s.page}>
            <div className={s.content__conteiner}> 
                <div className={s.profile__navigation}>
                    <nav id='profile-nav'>
                        <ul className={s.navigation__box}>
                            <li id='profilenav' className={sel(s.navigation__point)}>
                                <NavLink to='/profile'  className={({ isActive }) => isActive 
    ? sel("text text_type_main-medium", s.active__link) : sel("text text_type_main-medium text_color_inactive", s.link)}>
                                    Профиль
                                </NavLink>
                            </li>
                            <li className={sel(s.navigation__point)}>
                                <NavLink to='/login'  className={({ isActive }) => isActive 
    ? sel("text text_type_main-medium", s.active__link) : sel("text text_type_main-medium text_color_inactive", s.link)}>
                                    История заказов
                                </NavLink>
                            </li>
                            <li className={s.navigation__point}>
                                <NavLink to='/login' className={({ isActive }) => isActive 
    ? sel("text text_type_main-medium", s.active__link) : sel("text text_type_main-medium text_color_inactive", s.link)}>
                                    Выход
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <p className={sel(s.subtitle, 'text text_type_main-default text_color_inactive')}>В этом разделе вы можете изменить свои персональные данные</p>
                </div>
                <div className={s.container}>
            
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setNameValue(e.target.value)}
                    icon="EditIcon"
                    value={nameValue}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onChangeName}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"/>

                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass="mb-2"
                />

                <PasswordInput
                    onChange={onChangePassword}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                    icon="EditIcon"
                />

                    <Button htmlType="button" type="primary" size="medium" >Сохранить</ Button>                  
                </div>   
            </div>     
       </div>
    )
}