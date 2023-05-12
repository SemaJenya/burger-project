import { ReactElement } from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { useSelect } from '../../services/hooks';
import { getCookie } from '../../utils/cookie';


type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: ReactElement;
} & RouteProps;

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, onlyUnAuth, ...props }) => {
    const location = useLocation()
    //достать юзер тут
    const cookie = getCookie('accessToken');

    const user = useSelect(state => state.userStore.data);
    const isAuthChecked = useSelect(state => state.userStore.isAuthChecked);
    console.log(onlyUnAuth);
    

    if (!isAuthChecked) {
        return <div>Снова я загружаюсь. Снова говорю пока</div> //надо сделать нормальный компонент для загрузки
    };

    if (!onlyUnAuth && !cookie) {
        return (
            <Navigate to={{ pathname: '/login' }} replace state={{ from: location }} />
        )
    };

    if (cookie && onlyUnAuth) {
        const { from } = location.state || { from: { pathname: '/profile' } };
        const { background } = location.state?.from?.state || { background: null };
        return (
            <Navigate replace to={from} state={{ background }} />
        )
    };



    if (!cookie && onlyUnAuth && location.state === null && location.pathname === "/reset-password") {

        return (
            <Navigate to={{ pathname: '/forgot-password' }} />
        )
    };

    return children
}