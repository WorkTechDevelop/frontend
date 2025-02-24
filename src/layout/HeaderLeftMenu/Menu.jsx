import React from "react";
import { Link } from "react-router-dom";
import './Menu.scss';

const Menu = () => {
    return (
        <div className="left-menu__container">
            <nav>
                <div className="menu__container">
                    <ul>
                        <div className="main__container">
                            <icon className="main__icon"></icon>
                            <li><Link to="/">Главная</Link></li>
                        </div>
                        <div className="task__container">
                            <icons className="task__icon"></icons>
                            <li><Link to="/tasks">Задачи</Link></li>
                        </div>
                        <div className="members__container">
                            <icon className="member__icon"></icon>
                            <li><Link to="/projects-member">Участники</Link></li>
                        </div>
                        <div className="settings-project__container">
                            <icon className="settings-project__icon"></icon>
                            <li><Link to="/projects-settings">Настройки</Link></li>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Menu;