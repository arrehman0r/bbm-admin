import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLogin from '../pages/login/Login';
import AppDashboard from '../pages/dasboard';
import AppRegister from '../pages/register/Register';

const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    exact
                    path="/"
                    element={

                        <AppDashboard />

                    }
                />
                <Route path="/login" element={<AppLogin />} />
                <Route path="/register" element={<AppRegister />} />

            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
