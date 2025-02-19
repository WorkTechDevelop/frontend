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
                                <div class="texts">
                                    <div class="texts__description">
                                    </div>
                                    <Link class="texts__title" to="/">WorkTask</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="change-service">
                        <div class="change-service__inner">
                            <div class="change-service__title">
                                <Link class="text__title-create-task" to="/create-task">Создать задачу</Link>
                            </div>
                            <div class="search_block">
                                <form>
                                    <input type="search"name="text" class="search" placeholder="Поиск">
                                    </input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="header__side-right">
                    <div class="header__profile">
                        <div>
                            <div class="header__user">
                                <Link class="text__title-user" to="/user">Иванов Иван</Link>
                            </div>
                            <div class="text__title-user-role">тестировщик</div>
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