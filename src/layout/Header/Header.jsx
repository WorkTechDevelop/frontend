import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';


const Header = () => {
    return (
        <header>
            <div class="header">
                <div class="header__side">
                    <div class="header__logo" >W</div>
                    <div class="header__workspace">
                        <Link className="texts__title" to="/">WorkTask</Link>
                    </div>
                    <div class="header__create-task">
                        <li>
                            <Link to="/create-task">Создать задачу</Link>
                        </li>
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