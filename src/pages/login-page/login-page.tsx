import { useRef, useState } from 'react';
import sel from 'classnames';
import s from './style.module.css';
import { Link } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchLoginUser } from '../../services/reducers/user-info/user';
import { useDispatch } from '../../services/hooks';


export const LoginPage = () => {
    const inputRef = useRef(null)

    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e: React.SyntheticEvent) => {
        const {name, value} = e.target as HTMLInputElement;
        setUserData({
            ...userData,
            [name]: value
        });
    };

    const login = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(fetchLoginUser(userData))
    }

    return (
        <div className={s.registration__page}>
            <form className={s.registration__container} onSubmit={login}>
                <h2 className={sel(s.registration__title, 'text text_type_main-medium')}>Вход</h2>
           
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

                <Button htmlType="submit" type="primary" size="medium"  >Войти</ Button>
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
                
            </form>        
       </div>
    )
}