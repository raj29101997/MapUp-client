import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/utils';

const PublicRoute = () => {
    const isLoggedIn = getToken();
    if (isLoggedIn) {
        return <Navigate to={'/dashboard'} />;
    }
    return <Outlet />;
};

export default PublicRoute;