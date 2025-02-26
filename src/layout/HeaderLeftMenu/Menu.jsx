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
                            <icon className="main__icon"></icon>
                            <Link to="/">Главная</Link>
                        </li>
                        <li>
                            <icons className="task__icon"></icons>
                            <Link to="/tasks">Задачи</Link>
                        </li>
                        <li>
                            <icon className="member__icon"></icon>
                            <Link to="/projects-member">Участники</Link>
                        </li>
                        <li>
                            <icon className="settings-project__icon"></icon>
                            <Link to="/projects-settings">Настройки</Link>
                        </li>
                    </ul>
                </div>
                <div className="menu-down__container">
                    <div className="up__line"></div>
                    <div className="my-project-title__container">
                        <p className="my-project__title">МОИ ПРОЕКТЫ</p>
                        <icon className="add-new-project__icon"></icon>
                    </div>
                    <button className=""></button>
                </div>
            </nav>
        </div>
    );
};

export default Menu;