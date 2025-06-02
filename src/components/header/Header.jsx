import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import './Header.scss';
import UserProfile from "../../pages/UserProfile/UserProfile";
import CreateTaskHeader from "./CreateTaskHeader/CreateTaskHeader";
import LogoutButton from '../../components/LogoutButton';
import Info from "./Info/Info";
import ProjectName from "./ProjectName/ProjectName";
import SprintInfo from "./SprintInfo/SrpintInfo";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const firstName = localStorage.getItem('firstName') || "Гость";
    const lastName = localStorage.getItem('lastName') || "Пользователь";
    const dropdownRef = useRef(null); // Реф для меню настроек пользователя

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsMenuOpen(false); // Закрываем меню настроек пользователя при клике вне его
        }
    };

    useEffect (() => {
        // Добавляем обработчик кликов
        window.addEventListener('mousedown', handleClickOutside);
        // Убираем обработчик клика при скрытом меню настроек пользователя
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="main-header">
            <div className="header-left">
                <div className="logo">LOGO</div>
                <nav className="main-nav">
                    <ul>
                        <li className="active"><Link to="/">Главная</Link></li>
                        <li className="dropdown">
                            <Link to="#">Меню</Link>
                            <span className="dropdown-icon">▼</span>
                        </li>
                        <li><Link to="/create-task">Создать задачу</Link></li>
                        <li><Link to="/projects">Проекты</Link></li>
                        <li><Link to="/about">О нас</Link></li>
                    </ul>
                </nav>
            </div>
            
            <div className="header-right">
                <div className="search-container">
                    <input type="text" placeholder="Поиск" className="search-input" />
                    <span className="search-icon">🔍</span>
                </div>
                <div className="notification-icon">
                    <span className="notification-badge">5</span>
                    <span className="icon">🔔</span>
                </div>
                <div className="user-profile">
                    <span className="profile-icon">👤</span>
                </div>
            </div>
        </header>
    );
};

export default Header;