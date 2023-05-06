
import { NavLink } from 'react-router-dom';
import s from './style.module.css';
import sel from 'classnames';
import { useDispatch } from '../../services/hooks';
import { fetchLogout } from '../../services/reducers/user-info/user';



export const ProfileNavigate = () => {

    const dispatch = useDispatch();

    const activeLink = ({ isActive }: any) => isActive
        ? sel("text text_type_main-medium", s.active__link) : sel("text text_type_main-medium text_color_inactive", s.link);


    const handleLogout = () => {
        dispatch(fetchLogout())
    }

    return (
        <ul className={s.navigation__box}>
            <li id='profilenav' className={sel(s.navigation__point)}>
                <NavLink to='/profile/' className={activeLink}>
                    Профиль
                </NavLink>
            </li>
            <li className={sel(s.navigation__point)}>
                <NavLink to='/profile/orders' className={activeLink}>
                    История заказов
                </NavLink>
            </li>
            <li className={s.navigation__point}>
                <NavLink to='/login' className={activeLink} onClick={handleLogout} >
                    Выход
                </NavLink>
            </li>
        </ul>
    )
}
