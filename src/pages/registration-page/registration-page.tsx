import { Link } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { fetchRegistration } from '../../services/reducers/user-info/user';
import { useDispatch } from '../../services/hooks';



export const RegistrationPage = () => {

        const dispatch = useDispatch();


        const inputRef = useRef<HTMLInputElement>(null)
        const onIconClick = () => {
            if(inputRef.current !== null) {
                inputRef.current.focus()
            }
        }

        const [userData, setUserData] = useState({
            email: '',
            password: '',
            name: ''
        });
    
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            const {name, value} = e.target;
            setUserData({
                ...userData,
                [name]: value
            });
        };

        const registration = (e: FormEvent<HTMLFormElement>) => {
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