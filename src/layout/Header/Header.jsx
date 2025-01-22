import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div>
                <ul>
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/create-task">Создать задачу</Link>
                    </li>
                    <li>
                        <Link to="/user">Пользователь</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;