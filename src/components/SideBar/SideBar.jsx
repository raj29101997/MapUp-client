import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Toggle } from "../../assets/svgs/toggle.svg"
import LogOut from '../../pages/Auth/LogOut';
import './SideBar.css';

export const SideBar = ({ role, accessData }) => {
    const location = useLocation();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    return (
        <div className={"sidebar " + (isSidebarVisible ? "sidebar-open" : "sidebar-close")}>
            <div className='w-full flex justify-end toggle-container'>
                <button className="toggle-button" onClick={toggleSidebar}>
                    <Toggle />
                </button>
            </div>
            {isSidebarVisible && (
                <div className='w-full flex justify-center items-center'>
                    <ul >
                        {accessData.map((item, index) => (
                            <li key={index}>
                                <Link className={("hover:text-primary hover:underline ") + (location.pathname === item.path ? 'text-primary' : '')} to={item.path} >{item.label}</Link>
                            </li>
                        ))}
                        <LogOut />
                    </ul>
                </div>
            )}
        </div>
    );
};