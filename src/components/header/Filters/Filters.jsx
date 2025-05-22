import React, { useState, useRef, useEffect } from "react";
import "./Filters.scss";

const Filters = () => {
    const [isOpen, setIsOpen ] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const menuRef = useRef(null) // Реф для фильтров

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleFilterClick = (filter) => {
        setSelectedFilters ((prev) =>
        prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
        );
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false); //Закрываем меню при клике вне его
        }
    };

    useEffect(() => {
        // Добавляем обработчик клика
        window.addEventListener('mousedown', handleClickOutside);

        // Убираем обработчик при скрытом меню
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="filter-block" ref={menuRef}> {/* Применяем реф к фильтрам */}
            <button 
                className={`filter-button ${selectedFilters.length ? "active" : ""}`} 
                onClick={toggleMenu}
                >
                <div className="filter-icon" />
                <span>Фильтры</span>
            </button>

            {isOpen && (
                <div className="filter-menu">
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedFilters.includes("Дата")}
                            onChange={() => handleFilterClick("Дата")}
                        />
                        Дата
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={selectedFilters.includes("Приоритет")}
                            onChange={() => handleFilterClick("Приоритет")}
                        />
                        Приоритет
                    </label>
                </div>
            )}
        </div>
    );
};

export default Filters;