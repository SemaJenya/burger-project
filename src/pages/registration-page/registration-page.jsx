import { Link } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { useRef, useState } from 'react';
import { postRegistration } from '../../utils/api';
import { fetchRegistration } from '../../services/reducers/user-info/user';
import { useDispatch } from 'react-redux';


export const RegistrationPage = () => {

        const dispatch = useDispatch();


        const inputRef = useRef(null)
        const onIconClick = () => {
          setTimeout(() => inputRef.current.focus(), 0)
          alert('Icon Click Callback')
        }

        const [userData, setUserData] = useState({
            email: '',
            password: '',
            name: ''
        });
    
        const handleChange = e => {
            const {name, value} = e.target;
            setUserData({
                ...userData,
                [name]: value
            });
        };

        const registration = (e) => {
            e.preventDefault();
            dispatch(fetchRegistration(userData))
        }

    return (
        <div className={s.registration__page}>
            <form className={s.registration__container} onSubmit={registration}>
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Регистрация</h2>
                <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={handleChange}
                value={userData.name}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"/>

                <EmailInput
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    placeholder="Логин"
                    extraClass="mb-2"
                />

                <PasswordInput
                    onChange={handleChange}
                    value={userData.password}
                    name={'password'}
                    extraClass="mb-2"
                    icon="ShowIcon"
                />

                <Button htmlType="submit" type="primary" size="medium" >Зарегистрироваться</ Button>
                <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                    Уже зарегистрированы? 
                    <Link to='/login' className={sel(s.link, "text text_type_main-small text_color_inactive, ml-2")}>
                        Войти
                    </Link>
                </p>
            </form>        
       </div>
    )
}