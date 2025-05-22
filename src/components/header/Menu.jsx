import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.scss';

const Menu = () => {
    return (
        <div className="menu__container">
            <ul className="menu-list">
                <li>
                    <Link to="/">
                        <span className="main__icon"></span>
                        Главная
                    </Link>
                </li>
                <li>
                    <Link to="/tasks">
                        <span className="task__icon"></span>
                        Задачи
                    </Link>
                </li>
                <li>
                    <Link to="/members">
                        <span className="member__icon"></span>
                        Участники
                    </Link>
                </li>
                <li>
                    <Link to="/settings">
                        <span className="settings-project__icon"></span>
                        Настройки
                    </Link>
                </li>
            </ul>
            <div className="up__line"></div>
            <div className="my-project-title__container">
                <span className="my-project__title">Мои проекты</span>
                <span className="add-icon"></span>
            </div>
        </div>
    );
};

export default Menu; 