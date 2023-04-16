import { useRef, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import sel from 'classnames';
import s from './style.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { postResetPassword } from '../../utils/api';


export const ResetPasswordPage = () => {
    const inputRef = useRef(null);
    const location = useLocation();

   

    const navigate = useNavigate();

    const params = useParams();

    const [newPasswordValue, setNewPasswordValue] = useState('');
    const onChangePassword = e => {
        setNewPasswordValue(e.target.value);
    }

    const [codeValue, setCodeValue] = useState('');
    const onChangeCode = e => {
        setCodeValue(e.target.value);
    }

    const saveNewPassword = (e) => {
        e.preventDefault();
        console.log('сработал сабмин');
        if(newPasswordValue, codeValue) {
            postResetPassword(newPasswordValue, codeValue)
            .then(() => {
                navigate('/')
            })
            .catch((error) => error.massage)
        }
      
    }
   

    return (
        <div className={s.registration__page}>
            <form className={s.registration__container} onSubmit={saveNewPassword} >
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Восстановление пароля</h2>
           
                <PasswordInput
                    onChange={onChangePassword}
                    value={newPasswordValue}
                    placeholder={'Введите новый пароль'}
                    name={'password'}
                    extraClass="mb-2"
                    icon="ShowIcon"
                />

                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChangeCode}
                    value={codeValue}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="ml-1"
                />


                <Button htmlType="submit" type="primary" size="medium" >Cохранить</ Button>
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