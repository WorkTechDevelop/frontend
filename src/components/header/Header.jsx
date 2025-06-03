import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiUser, FiChevronDown, FiLogOut, FiSettings, FiUser as FiUserIcon } from "react-icons/fi";
import './Header.scss';

const Header = () => {
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Здесь может быть логика для очистки токенов, состояния и т.д.
        localStorage.removeItem('token');
        sessionStorage.removeItem('user');
        // Перенаправление на страницу логина
        navigate('/login');
    };

    return (
        <header className="main-header">
            <div className="header-left">
                <div className="logo">LOGO</div>
                <nav className="main-nav">
                    <ul>
                        <li className="active"><Link to="/">Главная</Link></li>
                        <li className="dropdown">
                            <Link to="#">Меню <FiChevronDown className="dropdown-icon" /></Link>
                        </li>
                        <li><Link to="/create-task">Создать задачу</Link></li>
                        <li><Link to="/projects">Проекты</Link></li>
                        <li><Link to="/about">О нас</Link></li>
                    </ul>
                </nav>
            </div>
            
            <div className="header-right">
                <div className="search-container">
                    <FiSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Поиск" 
                        className="search-input" 
                        id="main-search" 
                        name="search-query" 
                    />
                </div>
                <div className="notification-icon">
                    <span className="notification-badge">5</span>
                    <FiBell size={20} />
                </div>
                <div className="user-profile" ref={profileMenuRef}>
                    <div 
                        className="profile-button"
                        onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    >
                        <FiUser size={20} />
                    </div>
                    
                    {profileMenuOpen && (
                        <div className="profile-dropdown">
                            <div className="profile-header">
                                <div className="profile-avatar">
                                    <FiUserIcon size={24} />
                                </div>
                                <div className="profile-info">
                                    <div className="profile-name">Михаил Прибытков</div>
                                    <div className="profile-email">m.pribytkov@example.com</div>
                                </div>
                            </div>
                            <ul className="profile-menu">
                                <li>
                                    <Link to="/profile">
                                        <FiUser size={16} />
                                        <span>Профиль</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/settings">
                                        <FiSettings size={16} />
                                        <span>Настройки</span>
                                    </Link>
                                </li>
                                <li className="separator"></li>
                                <li>
                                    <button onClick={handleLogout}>
                                        <FiLogOut size={16} />
                                        <span>Выйти</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;