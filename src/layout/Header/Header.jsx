import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from '../../components/LogoutButton'; // Импортируйте компонент

import './Header.scss';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header>
            <div className="header">
                <div className="header__side">
                    <div className="header__workspace">
                        <div className="header-workspace__wrapper">
                            <div className="header-workspace__tooltip">
                                <div className="texts">
                                    <Link className="texts__title" to="/">WORK TASK</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="change-service">
                        <div className="change-service__inner">
                            <div data-testid='create-task-button-header' className="change-service__title">
                                <Link className="text__title-create-task" to="/create-task">Создать задачу</Link>
                            </div>
                            <div className="search_block">
                                <form>
                                    <div class='search__icon'>
                                        <input type="search" name="text" className="search" placeholder="Поиск" data-testid="search-input">
                                        </input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__side-right">
                    <div className="header__notification"></div>
                    <div className="header__profile">
                        <div>
                            <div className="header__user">
                                <Link data-testid='name-titie' className="text__title-user" to="/user">Прибытков Михаил</Link>
                            </div>
                            <div data-testid='user-role' className="text__title-user-role">разработчик</div>
                        </div>
                    </div>
                    <button data-testid='menu-downarrow-button' className={`menu__downarrow ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="dropdown-menu">
                    <div>
                        <li data-testid='profile-settings'>Профиль</li>
                    </div>
                    <div>
                        <LogoutButton />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;