import React, { useState, useEffect } from 'react';
import { getUserData } from '../../utils/utils';
import { Outlet } from 'react-router-dom';
import './WithNavbar.css';
import {SideBar}  from '../../components/SideBar/SideBar';

const WithNavbar = () => {
    const [userRole, setUserRole] = useState(null);
    const [accessData, setAccessData] = useState([]);

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUserRole(userData.role);
            setAccessData(userData.access);
        }
    }, []);

    return (
        <div className="container">
            <div>
                <SideBar role={userRole} accessData={accessData} />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default WithNavbar;