import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import './Header.scss';
import UserProfile from "../../pages/UserProfile/UserProfile";
import CreateTaskHeader from "./CreateTaskHeader/CreateTaskHeader";
import LogoutButton from '../../components/LogoutButton';
import Filters from "./Filters/Filters";
import Search from "./Search/Search";
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
        <header>
            <div className="header">
                <div className="header__side-left">
                    <div className="header__workspace">
                        <div className="header-workspace__wrapper">
                            <div className="header-workspace__tooltip">
                                <div className="texts">
                                    <Link className="texts__title" to="/">WORK TASK</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__center">
                    <div className="create-task_block">
                        <CreateTaskHeader />
                    </div>
                    <div className="project-name_block">
                        <ProjectName />
                    </div>
                    <div className="info_block">
                        <Info />
                    </div>
                    <div className="sprint-info_block">
                        <SprintInfo />
                    </div>
                    <div className="right-aligned_block">
                        <div className="filter_block">
                            <Filters />
                        </div>
                        <div className="search_block">
                            <Search />
                        </div>
                    </div>
                    </div>
                <div className="header__side-right">
                    <div className="header__notification"></div>
                    <button className="button-style"
                    onClick={toggleMenu}
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                    >
                        <div className="header__profile">
                            <div className="header__user">
                                <div data-testid='name-title' className="text__title-user">
                                    {`${lastName} ${firstName}`}
                                </div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <ul className="dropdown-menu" ref={dropdownRef}> {/* Применяем реф к меню настроек пользователя */}
                    <li>
                        <UserProfile />
                    </li>
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            )}
        </header>
    );
};

export default Header;