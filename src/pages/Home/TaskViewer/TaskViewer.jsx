import React from 'react';
import './TaskViewer.scss';

function formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
}

const TaskViewer = ({ task, onClose }) => {
    if (!task) return null;

    return (
        <div className="task-container-viewer">
            <div className="task-header">
                <div className="task-tag">{task.tag}</div>
                <h2>{task.title}</h2>
                <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="task-info-grid">
                <div className="info-item"><span className="info-label">Код:</span><span className="info-value">{task.tag}</span></div>
                <div className="info-item"><span className="info-label">Статус:</span><span className="info-value">{task.status}</span></div>
                <div className="info-item"><span className="info-label">Приоритет:</span><span className="info-value">{task.priority}</span></div>
                <div className="info-item"><span className="info-label">Тип:</span><span className="info-value">{task.taskType}</span></div>
                <div className="info-item"><span className="info-label">Оценка:</span><span className="info-value">{task.count ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Спринт:</span><span className="info-value">{task.sprintId ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Проект:</span><span className="info-value">{task.projectId ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Создатель:</span><span className="info-value">{task.creator ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Исполнитель:</span><span className="info-value">{task.assignee ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Дата создания:</span><span className="info-value">{formatDate(task.creationDate)}</span></div>
                <div className="info-item"><span className="info-label">Дата изменения:</span><span className="info-value">{formatDate(task.updateDate)}</span></div>
            </div>

            <div className="task-description">
                <div className="info-label">Описание</div>
                <div className="description-content">{task.description}</div>
            </div>
        </div>
    );
};

export default TaskViewer; 