
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import s from './style.module.css';
import sel from 'classnames';
import { useRef, useState } from 'react';


export const RegistrationPage = () => {
    
        const [nameValue, setNameValue] = useState('')
        const [emailValue, setEmailValue] = useState('')
        const [paswordValue, setPaswordValue] = useState('')
        const inputRef = useRef(null)
        const onIconClick = () => {
          setTimeout(() => inputRef.current.focus(), 0)
          alert('Icon Click Callback')
        }

    return (
        <div className={s.registration__page}>
            <div className={s.registration__container}>
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Регистрация</h2>
                <Input
                type={'text'}
                placeholder={'Имя'}
                onChange={e => setNameValue(e.target.value)}
                icon={'CurrencyIcon'}
                value={nameValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"/>

                <Input
                type={'text'}
                placeholder={'E-mail'}
                onChange={e => setEmailValue(e.target.value)}
                icon={'CurrencyIcon'}
                value={emailValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"/>

                <Input
                type={'text'}
                placeholder={'Пароль'}
                onChange={e => setPaswordValue(e.target.value)}
                icon={'CurrencyIcon'}
                value={paswordValue}
                name={'name'}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="ml-1"/>

                <Button htmlType="button" type="primary" size="medium" >Зарегистрироваться</ Button>
                <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                    Уже зарегистрированы? <a>Войти</a></p>
            </div>        
       </div>
    )
}