import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';


const Header = () => {
    return (
        <header>
            <div class="header">
                <div class="header__side">
                    <div class="header__workspace">
                        <div class="header-workspace__wrapper">
                            <div class="header-workspace__tooltip">
                                <div class="header-workspace__avatar">
                                <div class="header__logo" >W</div>
                                </div>
                                <div class="texts">
                                    <div class="texts__description">
                                        <div class="texts__name">Проект</div>
                                    </div>
                                    <Link class="texts__title" to="/">WorkTask</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="change-service">
                        <div class="change-service__inner">
                            <div class="change-service__title">
                                <Link class="texts__title" to="/create-task">Создать задачу</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header__side-right">
                    <div class="header__profile">
                        <div class="header__user">
                            <li>
                                <Link to="/user">Профиль</Link>
                            </li>
                            <div class="header__profile.avatar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

// <div class="header__create-task">
// <li>
//     <Link to="/create-task">Создать задачу</Link>
// </li>
// </div>