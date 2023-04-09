import { Link } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { useRef, useState } from 'react';
import { postRegistration } from '../../utils/api';
import { fetchRegistration } from '../../services/reducers/user-info/registration';
import { useDispatch } from 'react-redux';


export const RegistrationPage = () => {

        const dispatch = useDispatch();
    
        const [nameValue, setNameValue] = useState('')
        const onChangeName = e => {
            setNameValue(e.target.value);
        };

        const [emailValue, setEmailValue] = useState('')
        const onChangeEmail = e => {
            setEmailValue(e.target.value);
        };

        const [passwordValue, setPasswordValue] = useState('')
        const onChangePassword = e => {
            setPasswordValue(e.target.value);
        }

        const inputRef = useRef(null)
        const onIconClick = () => {
          setTimeout(() => inputRef.current.focus(), 0)
          alert('Icon Click Callback')
        }

        const registration = () => {
            dispatch(fetchRegistration({email: emailValue, password: passwordValue, name: nameValue}))
        }

    return (
        <div className={s.registration__page}>
            <div className={s.registration__container}>
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Регистрация</h2>
                <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={onChangeName}
                value={nameValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"/>

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

                <Button htmlType="button" type="primary" size="medium" onClick={registration}>Зарегистрироваться</ Button>
                <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                    Уже зарегистрированы? 
                    <Link to='/login' className={sel(s.link, "text text_type_main-small text_color_inactive, ml-2")}>
                        Войти
                    </Link>
                </p>
            </div>        
       </div>
    )
}