import React, { useState, useRef, useEffect } from "react";
import './Info.scss';


const Info = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null); // Реф для модалки

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsModalOpen(false); // Закрываем модалку при клике вне ее
        }
    };

    useEffect(() => {
        // Добавляем обработчики клика только при открытой модалке
        if(isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        // Убираем обработчик клика при скрытой модалке
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <div data-testid='info-button-header' className="info-button__title">
            {/* <button className="info-button" 
            onClick={toggleModal}
            title="Информация о проекте"
            > */}
                {/* <div className="info-icon" /> */}
            {/* </button> */}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalRef}> {/* Применяем реф к модалке */}
                        <div className="modal-header">
                            <h3>Статистика проекта</h3>
                            <button className="close-button" onClick={toggleModal}>X</button>
                        </div>
                        <div className="modal-body">
                            <p>Здесь будет отображаться информация</p>
                            {/* Сюды нужно будет вложить инфу с бека */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Info;