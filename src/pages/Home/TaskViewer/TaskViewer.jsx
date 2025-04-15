import React from 'react';
import './TaskViewer.scss';

const TaskViewer = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <div className="task-container-viewer">
            <div className="task-header">
                <div className="task-tag">{task.tag}</div>
                <h2>{task.title}</h2>
                <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="task-info">
                <div className="info-item">
                    <div className="info-label">Спринт</div>
                    <div className="info-value">не указан</div>
                </div>
                <div className="info-item">
                    <div className="info-label">Оценка</div>
                    <div className="info-value">не указана</div>
                </div>
                <div className="info-item">
                    <div className="info-label">Исполнитель</div>
                    <div className="info-value">{task.assignee}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">Приоритет</div>
                    <div className="info-value">{task.priority}</div>
                </div>
                <div className="info-item">
                    <div className="info-label">Статус</div>
                    <div className="info-value">{task.status}</div>
                </div>
            </div>

            <div className="task-description">
                <div className="info-label">Описание</div>
                <div className="description-content">{task.description}</div>
            </div>
        </div>
    );
};

export default TaskViewer; 