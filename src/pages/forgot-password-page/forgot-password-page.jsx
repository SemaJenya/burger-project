import { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sel from 'classnames';
import s from './style.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postPasswordRecovery } from '../../utils/api';


export const ForgotPasswordPage = () => {

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const navigate = useNavigate();
    const location = useLocation();

    const isEmailValid = (emailValue) => {
        return EMAIL_REGEXP.test(emailValue);
    }

    const [userDataEmail, setUserData] = useState('');

    const handleChange = e => {
        setUserData(e.target.value);
    };

    const disabledButton = isEmailValid(userDataEmail);

    const handleClick = (e) => {
        e.preventDefault();
        if(userDataEmail) {
            postPasswordRecovery(userDataEmail)
            .then(() => {
                navigate('/reset-password', {state: location})
            })
            .catch((error) => console.log(error, 'Ошибка. Проверь адрес'))
        }  
    }


    return (
        <div className={s.registration__page}>
            <form className={s.registration__container} onSubmit={handleClick}>
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Вход</h2>
           
                <EmailInput
                    onChange={handleChange}
                    value={userDataEmail}
                    name={'email'}
                    placeholder="Логин"
                    extraClass="mb-2"
                    type="email"
                />

                <Button htmlType="submit" type="primary" size="medium"  disabled={!disabledButton}>Восстановить</ Button>
                <div className={s.subtitle__box}>
                    <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                        Вспомнили пароль? 
                        <Link to='/login' className={sel(s.link, "text text_type_main-small text_color_inactive, ml-2")}>
                            Войти
                        </Link>
                    </p>
                </div>
                
            </form>        
       </div>
    )
}