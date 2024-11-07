import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InvalidUrlHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(-1); // Navigate back to the previous page
    }, [navigate]);

    return null; 
};

export default InvalidUrlHandler;