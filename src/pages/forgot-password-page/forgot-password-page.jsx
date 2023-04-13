import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sel from 'classnames';
import s from './style.module.css';
import { Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { postPasswordRecovery } from '../../utils/api';


export const ForgotPasswordPage = () => {

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const navigate = useNavigate();

    const isEmailValid = (emailValue) => {
        return EMAIL_REGEXP.test(emailValue);
    }
    
   const disabledButton = isEmailValid(userData.email);

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

    const handleClick = () => {
        if(userData.email) {
            postPasswordRecovery(userData.email)
            .then(() => {
                navigate('/reset-password')
            })
            .catch((error) => console.log(error, 'Ошибка. Проверь адрес'))
        }  
    }


    return (
        <div className={s.registration__page}>
            <div className={s.registration__container}>
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Вход</h2>
           
                <EmailInput
                    onChange={handleChange}
                    value={userData.email}
                    name={'email'}
                    placeholder="Логин"
                    extraClass="mb-2"
                    type="email"
                />

                <Button htmlType="button" type="primary" size="medium" onClick={handleClick} disabled={!disabledButton}>Восстановить</ Button>
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