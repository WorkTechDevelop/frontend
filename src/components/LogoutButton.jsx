import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        
        localStorage.removeItem('authToken'); 

        navigate('/login'); 
    };

    return (
        <li onClick={handleLogout} data-testid="logout-button">
            Выйти
        </li>
    );
};

export default LogoutButton;
