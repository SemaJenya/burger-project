import { useEffect, useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../utils/api';
import { fetchChangeProfile, fetchLoginUser, fetchLogout } from '../../services/reducers/user-info/user';
import { useDispatch, useSelector } from 'react-redux';


export const ProfilePage = () => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const activeLink = ({ isActive }) => isActive 
    ? sel("text text_type_main-medium", s.active__link) : sel("text text_type_main-medium text_color_inactive", s.link);

    const userDataStore = useSelector(state => state.userStore.data);

    
    const [userData, setUserData] = useState({
        email: userDataStore.email,
        password: '',
        name: userDataStore.name
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };
    console.log(userData);

    const disabledButton = userData.email !== userDataStore.email || userData.name !== userDataStore.name || userData.password ? false : true;

    const updateUserInfo = () => {
            dispatch(fetchChangeProfile(userData))     
    }

    const resetUserInfo = () => {
        setUserData({
            email: userDataStore.email,
            password: '',
            name: userDataStore.name
        });
    }

    const handleLogout = () => {
        dispatch(fetchLogout())
    }

    return (
        <div className={s.page}>
            <div className={s.content__conteiner}> 
                <div className={s.profile__navigation}>
                    <nav id='profile-nav'>
                        <ul className={s.navigation__box}>
                            <li id='profilenav' className={sel(s.navigation__point)}>
                                <NavLink to='/profile'  className={activeLink}>
                                    Профиль
                                </NavLink>
                            </li>
                            <li className={sel(s.navigation__point)}>
                                <NavLink to='/profile/orders'  className={activeLink}>
                                    История заказов
                                </NavLink>
                            </li>
                            <li className={s.navigation__point}>
                                <NavLink to='/login' className={activeLink} onClick={handleLogout} >
                                    Выход
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <p className={sel(s.subtitle, 'text text_type_main-default text_color_inactive')}>В этом разделе вы можете изменить свои персональные данные</p>
                </div>
                <form className={s.container}>
            
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={handleChange}
                        icon="EditIcon"
                        value={userData?.name}
                        name={'name'}
                        error={false}
                        ref={inputRef}
                        // onIconClick={onChangeName}
                        errorText={'Ошибка'}
                        size={'default'}
                        extraClass="ml-1"/>

                    <EmailInput
                        onChange={handleChange}
                        value={userData?.email}
                        name={'email'}
                        placeholder="Логин"
                        isIcon={true}
                        extraClass="mb-2"
                    />

                    <PasswordInput
                        onChange={handleChange}
                        value={userData.password}
                        name={'password'}
                        extraClass="mb-2"
                        icon="EditIcon"
                    />
                    <div className={s.button__container}>
                        <Button htmlType="button" type="primary" size="medium" onClick={updateUserInfo} disabled={disabledButton}>Сохранить</ Button> 
                        <Button htmlType="button" type="primary" size="medium" onClick={resetUserInfo} disabled={disabledButton}>Oтменить</ Button>
                    </div>
                                     
                </form>   
            </div>     
       </div>
    )
}