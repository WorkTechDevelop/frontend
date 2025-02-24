import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';


const Header = () => {
    return (
        <header>
            <div className="header">
                <div className="header__side">
                    <div className="header__workspace">
                        <div className="header-workspace__wrapper">
                            <div className="header-workspace__tooltip">
                                <div className="texts">
                                    <Link className="texts__title" to="/">WorkTask</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="change-service">
                        <div className="change-service__inner">
                            <div className="change-service__title">
                                <Link className="text__title-create-task" to="/create-task">Создать задачу</Link>
                            </div>
                            <div className="search_block">
                                <form>
                                    <div class='search__icon'>
                                        <input type="search" name="text" className="search" placeholder="Поиск">
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
                                <Link className="text__title-user" to="/user">Иванов Иван</Link>
                            </div>
                            <div className="text__title-user-role">тестировщик</div>
                        </div>
                    </div>
                    <button className="menu__downarrow"></button>
                </div>
            </div>
        </header>
    );
};

export default Header;