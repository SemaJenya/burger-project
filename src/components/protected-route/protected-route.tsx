import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';
import { RootState } from '../../services/store';


type TProtectedRouteProps = {
    onlyUnAuth?: boolean;
    children: ReactElement;
} & RouteProps;

export const ProtectedRoute: React.FC<TProtectedRouteProps> = ({children, onlyUnAuth, ...props}) => {
    const location = useLocation()
    //достать юзер тут

    const user = useSelector<RootState>(state => state.userStore.data);
    const isAuthChecked = useSelector<RootState>(state => state.userStore.isAuthChecked);

    if(!isAuthChecked) {
        return <div>Снова я загружаюсь. Снова говорю пока</div> //надо сделать нормальный компонент для загрузки
    };
    if(!user && !onlyUnAuth) {
        return (
            <Navigate to={{ pathname: '/login'}} replace state={{ from: location}} />
        )
    };

    if(user && onlyUnAuth) {
        const { from } = location.state || { from: {pathname: '/profile'}};
        const { background } = location.state?.from?.state || { background: null };
        return (
            <Navigate replace to={from} state={{background}}/>
        )
    };

    if(!user && onlyUnAuth && location.state === null &&  location.pathname === "/reset-password") {

        return (
            <Navigate to={{ pathname: '/forgot-password'}} />
        )
    };

    return children
}