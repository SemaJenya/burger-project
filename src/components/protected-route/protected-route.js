import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({children, user, onlyUnAuth}) => {
    //достать юзер тут
    const location = useLocation()
    console.log('заходтм');
    if(!user && !onlyUnAuth) {
        return (
            <Navigate to={{ pathname: '/login'}} replace state={{ from: location}} />
        )
    }
    if(user && onlyUnAuth) {
        const { from } = location.state || { from: {pathname: '/login'}};
        console.log(' прошли проверку на юзера');
        return (
            <Navigate replace to={from}  />
        )
    }
    return children
}