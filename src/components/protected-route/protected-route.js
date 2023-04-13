import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({children, onlyUnAuth}) => {
    const location = useLocation()
    //достать юзер тут

    const user = useSelector(state => state.userStore.data);
    const isAuthChecked = useSelector(state => state.userStore.isAuthChecked);

    if(!isAuthChecked) {
        return <div>Снова я загружаюсь. Снова говорю пока</div> //надо сделать нормальный компонент для загрузки
    }
    if(!user && !onlyUnAuth) {
        return (
            <Navigate to={{ pathname: '/login'}} replace state={{ from: location}} />
        )
    }
    

    if(user && onlyUnAuth) {
        const { from } = location.state || { from: {pathname: '/profile'}};
        const { background } = location.state?.from?.state || { background: null };


        return (
            <Navigate replace to={from} state={{background}}/>
        )
    }

    return children
}