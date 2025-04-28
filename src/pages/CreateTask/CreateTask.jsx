import React, { useState } from 'react';
import './CreateTask.scss';
import { API_ENDPOINTS } from '../../config/api';

const CreateTask = ({ onClose, currentUser }) => {
    const [taskDetails, setTaskDetails] = useState({
        title: '',
        description: '',
        priority: 'Low',
        taskType: 'Task',
        assignee: currentUser || '',
        sprint: 'Backlog',
        estimate: ''
    });

    const [errors, setErrors] = useState({ estimate: '' });
    const [apiError, setApiError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskDetails(prev => ({ ...prev, [name]: value }));

        if (name === 'estimate') {
            const numValue = Number(value);
            if (!Number.isInteger(numValue) || numValue < 0) {
                setErrors(prev => ({ ...prev, estimate: 'Оценка должна быть неотрицательным целым числом' }));
            } else {
                setErrors(prev => ({ ...prev, estimate: '' }));
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
            creator: currentUser,
            assignee: taskDetails.assignee,
            projectId: 1,
            sprintId: taskDetails.sprint,
            taskType: taskDetails.taskType,
            estimation: parseInt(taskDetails.estimate, 10) || 0,
            status: "To Do"
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
            setApiError('Не удалось создать задачу.');
            console.error('Ошибка:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="compact-create-task">
            <input
                type="text"
                name="title"
                placeholder="Название *"
                required
                value={taskDetails.title}
                onChange={handleChange}
            />

            <select name="taskType" value={taskDetails.taskType} onChange={handleChange}>
                <option value="Task">Task</option>
                <option value="Bug">Bug</option>
                <option value="Spike">Spike</option>
            </select>

            <select name="priority" value={taskDetails.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Blocker">Blocker</option>
            </select>

            <input
                type="text"
                name="assignee"
                placeholder="Исполнитель"
                value={taskDetails.assignee}
                onChange={handleChange}
                disabled
            />

            <div className="estimate-wrapper">
                {/* Место для иконки часов */}
                <div className="clock-icon"></div> 
                <input
                    type="number"
                    name="estimate"
                    placeholder="0"
                    min="0"
                    value={taskDetails.estimate}
                    onChange={handleChange}
                />

            <select name="sprint" value={taskDetails.sprint} onChange={handleChange}>
                <option value="Backlog">Backlog</option>
                <option value="Sprint 1">Sprint 1</option>
                <option value="Sprint 2">Sprint 2</option>
            </select>
            </div>

            <textarea
                name="description"
                placeholder="Описание"
                value={taskDetails.description}
                onChange={handleChange}
            />

            <div className="buttons">
                <button type="submit" className="create-task-button-in-menu">Создать</button>
                <button type="button" onClick={onClose} className="cancel-button">Отмена</button>
            </div>

            {errors.estimate && <p className="error-message">{errors.estimate}</p>}
            {apiError && <p className="error-message">{apiError}</p>}
        </form>
    );
};

export default CreateTask;