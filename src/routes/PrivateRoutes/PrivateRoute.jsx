import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getToken, getUserRole } from '../../utils/utils';

const PrivateRoute = ({ allowedRoles }) => {
    const navigate = useNavigate();
    const isLoggedin = getToken();
    const userRole = getUserRole();

    useEffect(() => {
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            navigate(-1); 
        }
    }, [allowedRoles, userRole, navigate]);

    if (!isLoggedin) {
        return <Navigate to="/" />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return null;
    }

    return <Outlet />;
};

export default PrivateRoute;