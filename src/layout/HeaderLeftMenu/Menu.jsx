import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss';

const Menu = () => {
    return (
        <div>
            <nav>
                <div className="menu__container">
                    <ul className="menu-list">
                        <li>
                            <span className="main__icon"></span>
                            <Link data-testid='main-menu-button' to="/">Главная</Link>
                        </li>
                        <li>
                            <span className="task__icon"></span>
                            <Link data-testid='task-menu-button' to="/tasks">Задачи</Link>
                        </li>
                        <li>
                            <span className="member__icon"></span>
                            <Link data-testid='member-menu-button' to="/projects-member">Участники</Link>
                        </li>
                        <li>
                            <span className="settings-project__icon"></span>
                            <Link data-testid='settings-project-menu-button' to="/projects-settings">Настройки</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-down__container">
                    <div className="up__line"></div>
                    <div className="my-project-title__container">
                        <p className="my-project__title">МОИ ПРОЕКТЫ</p>
                        <span className="add-new-project__icon"></span>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Menu;