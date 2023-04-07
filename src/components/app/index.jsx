import { useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { AppHeader } from '../app-header'
import s from './style.module.css'
import { fetchIngredients } from '../../services/reducers/ingredients'
import { MainPage } from '../../pages/main-page/main-page';
import { RegistrationPage } from '../../pages/registration-page/registration-page';
import { LoginPage } from '../../pages/login-page/login-page';
import { ForgotPasswordPage } from '../../pages/forgot-password-page/forgot-password-page';



export const App = () => {


// const [ingredients, setIngredients] = useState([]);
const dispatch = useDispatch()

useEffect(() => {
    dispatch(fetchIngredients());
}, [dispatch]);




    return(
    <div className={s.app}>
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/register' element={<RegistrationPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/forgot-password' element={<ForgotPasswordPage />} />

            </Routes>        
        </DndProvider>    
    </div>
    )
}