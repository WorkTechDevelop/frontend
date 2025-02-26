import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss';

const Menu = () => {
    return (
        <div>
            <nav>
                <div className="menu__container">
                    <ul className="menu-list">
                        <icon className="main__icon"></icon>
                        <li><Link to="/">Главная</Link></li>
                        <icons className="task__icon"></icons>
                        <li><Link to="/tasks">Задачи</Link></li>
                        <icon className="member__icon"></icon>
                        <li><Link to="/projects-member">Участники</Link></li>
                        <icon className="settings-project__icon"></icon>
                        <li><Link to="/projects-settings">Настройки</Link></li>
                    </ul>
                </div>
                <div className="menu-down__container">
                    <div className="up__line"></div>
                    <div className="my-project-title__container">
                        <p className="my-project__title">МОИ ПРОЕКТЫ</p>
                        <icon className="add-new-project"></icon>
                    </div>
                    <button className=""></button>

                </div>
            </nav>
        </div>
    );
};

export default Menu;