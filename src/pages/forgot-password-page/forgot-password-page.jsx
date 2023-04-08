import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import sel from 'classnames';
import s from './style.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';


export const ForgotPasswordPage = () => {

    const [emailValue, setEmailValue] = useState('')
    const onChangeEmail = e => {
        setEmailValue(e.target.value);
    };
    const inputRef = useRef(null)
  

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

                <Button htmlType="button" type="primary" size="medium" >Восстановить</ Button>
                <div className={s.subtitle__box}>
                    <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                        Вспомнили пароль? 
                        <Link to='/login' className={sel(s.link, "text text_type_main-small text_color_inactive, ml-2")}>
                            Войти
                        </Link>
                    </p>
                </div>
                
            </div>        
       </div>
    )
}