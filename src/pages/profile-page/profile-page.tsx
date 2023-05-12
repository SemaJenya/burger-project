import { ChangeEvent, useEffect, useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom'
import { UserObject } from '../../utils/api';
import { fetchChangeProfile, fetchLogout } from '../../services/reducers/user-info/user';
import { useDispatch, useSelect } from '../../services/hooks';
import { ProfileNavigate } from '../../components/profile-navigate/profile-navigate';



export const ProfilePage = () => {
    const inputRef = useRef(null);
    const dispatch = useDispatch();     
    
    const userDataStore = useSelect(state => state.userStore.data) as UserObject;
    

    const [userData, setUserData] = useState({
        email: userDataStore.email,
        password: '',
        name: userDataStore.name
    });
  

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };

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
   
    return userDataStore === null ? (<div>загружаюсь</div>) : (
        <section className={s.page}>
            <div className={s.content__conteiner}> 
                <div className={s.profile__navigation}>
                    <nav id='profile-nav'>
                        <ProfileNavigate />
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
       </section>
    )
}