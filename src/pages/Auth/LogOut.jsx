import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const clearToken = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            localStorage.removeItem('role');
            navigate('/');
        }
    }

    const buttonStyle = {
        fontSize: '16px',
        color: isHovered ? '#2980b9' : 'white',
        cursor: 'pointer',
    };

    return (
        <div>
            <button className="bg-primary text-white font-bold py-1 px-4 rounded"
                style={buttonStyle}
                onClick={clearToken}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                Logout
            </button>
        </div>
    );
}

export default LogOut;