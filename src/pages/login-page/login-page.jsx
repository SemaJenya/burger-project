import { useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';


export const LoginPage = () => {

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
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Вход</h2>
           
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

                <Button htmlType="button" type="primary" size="medium" >Войти</ Button>
                <div className={s.subtitle__box}>
                    <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                    Вы — новый пользователь? <a>Зарегистрироваться</a></p>
                    <p className={sel(s.registration__subtitle, "text text_type_main-small text_color_inactive")}>
                    Забыли пароль? <a>Восстановить пароль</a></p>
                </div>
                
            </div>        
       </div>
    )
}