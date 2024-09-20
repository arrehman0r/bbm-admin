import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element }) => {
    const userData = useSelector(state => state.user.loginUser);
const isAuthenticated =  userData?.id
    return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
