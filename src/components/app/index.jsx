import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Routes, Route, useLocation, useNavigate, BrowserRouter} from 'react-router-dom';

import { AppHeader } from '../app-header'
import s from './style.module.css'
import { fetchIngredients } from '../../services/reducers/ingredients'
import { MainPage } from '../../pages/main-page/main-page';
import { RegistrationPage } from '../../pages/registration-page/registration-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';
import { ResetPasswordPage } from '../../pages/reset-password-page/reset-password-page';
import { ProfilePage } from '../../pages/profile-page/profile-page';
import { IngredientsID } from '../../pages/ingredients-id/ingredients-id';
import { checkUserAuth } from '../../services/reducers/user-info/user';
import { Modal } from '../modal';
import { IngredientDetails } from '../ingredient-details';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from '../../services/hooks';




export const App = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const background = location.state?.background;

    useEffect(() => {
        dispatch(fetchIngredients());
    
        dispatch(checkUserAuth());
    }, [dispatch]);

    const closeIngredientModal = () => {
        navigate(background.pathname || '/', {replace: true});
    }



    return(
    <div className={s.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
            <Routes location={background || location}>
                <Route path='/' element={<MainPage />} />
                <Route path='/register' element={
                    <ProtectedRoute onlyUnAuth >
                        <RegistrationPage />
                    </ProtectedRoute>
                } />
                <Route path='/login' element={
                    <ProtectedRoute onlyUnAuth >
                        <LoginPage />
                    </ProtectedRoute> 
                } />
                <Route path='/forgot-password' element={
                    <ProtectedRoute onlyUnAuth>
                        <ForgotPasswordPage />
                    </ProtectedRoute>
                } />
                <Route path='/reset-password' element={
                    <ProtectedRoute onlyUnAuth >
                        <ResetPasswordPage />
                    </ProtectedRoute>
                }/>
                <Route path={`/ingredients/:id`} element={<IngredientsID />} />
                <Route path='*' element={<div>404</div>} />
                <Route path='/profile' element={
                    <ProtectedRoute >
                        <ProfilePage />
                    </ProtectedRoute>
                }/>
            </Routes>  

            {background &&
            <Routes>
                <Route path={`/ingredients/:id`} element={background && <Modal title='Детали ингредиента' onClose={closeIngredientModal}><IngredientDetails /></Modal>}/>
            </Routes> }
    
        </DndProvider>    
    </div>
    )
}