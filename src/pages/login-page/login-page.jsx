import { useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css'
import { Link } from 'react-router-dom'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';


export const LoginPage = () => {
    const inputRef = useRef(null)

    const [emailValue, setEmailValue] = useState('');
    const onChangeEmail = e => {
        setEmailValue(e.target.value);
    };

    const [passwordValue, setPasswordValue] = useState('')
    const onChangePassword = e => {
        setPasswordValue(e.target.value);
    }


    return (
        <div className={s.registration__page}>
            <div className={s.registration__container}>
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Вход</h2>
           
                <EmailInput
                    onChange={onChangeEmail}
                    value={emailValue}
                    name={'email'}
                    placeholder="Логин"
                    extraClass="mb-2"
                />

                <PasswordInput
                    onChange={onChangePassword}
                    value={passwordValue}
                    name={'password'}
                    extraClass="mb-2"
                    icon="ShowIcon"
                />

                <Button htmlType="button" type="primary" size="medium" >Войти</ Button>
                <div className={s.subtitle__box}>
                    <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                        Вы — новый пользователь? 
                        <Link to='/register' className={sel(s.link, "text text_type_main-small text_color_inactive, ml-2")}>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                        Забыли пароль? 
                        <Link to='/forgot-password' className={sel(s.link, "text text_type_main-small text_color_inactive, ml-2")}>
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
                
            </div>        
       </div>
    )
}