import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CreateTask.scss';
import { API_ENDPOINTS } from '../../config/api';

const CreateTask = ({ onClose }) => {
    // const modalRef = useRef(null);

    // // Закрытие по клику вне модального окна
    // const handleClickOutside = useCallback((event) => {
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //         onClose();
    //     }
    // }, [onClose]);

    // // Закрытие по нажатию на Esc
    // const handleKeyDown = useCallback((event) => {
    //     if (event.key === 'Escape') {
    //         onClose();
    //     }
    // }, [onClose]);

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside);
    //     document.addEventListener('keydown', handleKeyDown);

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //         document.removeEventListene('keydown', handleKeyDown);
    //     };
    // }, [handleClickOutside, handleKeyDown]);

    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        priority: '',
        assignee: '',
        project: '',
        sprint: '',
        taskType: '',
        estimate: ''
    });

    const [errors, setErrors] = useState({ estimate: '' });
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails({ ...taskDetails, [name]: value });

        if (name === 'estimate') {
            const numValue = Number(value);

            if (!Number.isInteger(numValue) || numValue < 1) {
                setErrors({ ...errors, estimate: 'Оценка задачи должна быть целым числом больше 0' });
            } else {
                setErrors({ ...errors, estimate: '' });
                setTaskDetails({ ...taskDetails, [name]: numValue });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (errors.estimate) return;

        const authToken = localStorage.getItem('authToken');
        const body = {
            title: taskDetails.title,
            description: taskDetails.description,
            priority: taskDetails.priority,
            creator: "creator",
            assignee: taskDetails.assignee,
            projectId: taskDetails.project,
            sprintId: taskDetails.sprint,
            taskType: taskDetails.taskType,
            estimation: parseInt(taskDetails.estimate, 10),
            status: "status"
        };

        try {
            const response = await fetch(API_ENDPOINTS.CREATE_TASK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) throw new Error('Ошибка при создании задачи');

            onClose();
        } catch (error) {
            setApiError('Не удалось создать задачу, попробуйте снова.');
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="create-task">
            <div className="modal-header">
                <h2>Новая задача - проект: "Проект 1"</h2>
                <button className="close-button" onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-container">
                    {/* Левая колонка */}
                    <div className="form-left">
                        <input type="text" name="title" placeholder="Название*" required value={taskDetails.title} onChange={handleChange} className="task-name-input" />
                        <textarea name="description" placeholder="Описание" value={taskDetails.description} onChange={handleChange} className="task-textarea" />
                    </div>

                    {/* Правая колонка */}
                    <div className="form-right">
                        {/* <select name="project" required value={taskDetails.project} onChange={handleChange} className="task-select">
                            <option value="">Проект*</option>
                            <option value="1">Проект 1</option>
                            <option value="2">Проект 2</option>
                        </select> */}

                        {/* <select name="sprint" value={taskDetails.sprint} onChange={handleChange} className="sprint-select">
                            <option value="">Спринт</option>
                            <option value="1">Спринт 1</option>
                            <option value="2">Спринт 2</option>
                        </select> */}

                        <div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                            <div> </div>
                        </div>

                        <select name="priority" required value={taskDetails.priority} onChange={handleChange} className="task-select">
                            <option value="">Приоритет* - Будет иконка</option>
                            <option value="blocker">BLOCKER</option>
                            <option value="high">HIGH</option>
                            <option value="medium">MEDIUM</option>
                            <option value="low">LOW</option>
                        </select>

                        <select name="taskType" required value={taskDetails.taskType} onChange={handleChange} className="task-select">
                            <option value="">Тип* - будет иконка</option>
                            <option value="bug">BUG</option>
                            <option value="task">TASK</option>
                            <option value="research">RESEARCH</option>
                            <option value="story">STORY</option>
                        </select>

                        <div>
                            {/*Оценку объеденить со скрепкой и расположить рядом*/}
                        <input type="number" name="estimate" placeholder="Оценка - сделать маленький кружок" 
                        value={taskDetails.estimate} onChange={handleChange} 
                        className={`task-input ${errors.estimate ? 'input-error' : ''}`} min="1" 
                        />
                        {errors.estimate && <p className="error-popup">{errors.estimate}</p>}
                        </div>

                        <input type="text" name="assignee" placeholder="Исполнитель" value={taskDetails.assignee} onChange={handleChange} className="task-input" />

                        <select name="sprint" value={taskDetails.sprint} onChange={handleChange} className="sprint-select">
                            <option value="">Спринт</option>
                            <option value="1">Спринт 1</option>
                            <option value="2">Спринт 2</option>
                        </select>
                        
                            {/*Сделать скрепку где-то рядом с оценкой*/}
                        <button type="button" className="upload-file">Загрузить файл - сделать скрепку</button>

                        <button type="submit" className="create-task-button-in-modal">Создать</button>
                        
                        {apiError && <p className="error">{apiError}</p>}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;