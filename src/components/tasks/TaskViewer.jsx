import React from 'react';
import './TaskViewer.scss';
import { useTasks } from '../../hooks/useTasks';
// import { formatDate } from '../../utils/dateUtils'; // удалено, такого файла нет

function formatDateLocal(dateString) {
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
    const { getTaskByCode } = useTasks();
    if (!task) return null;

    // Берём задачу из project-tasks, если есть
    const projectTask = getTaskByCode ? getTaskByCode(task.code) : null;
    console.log('TaskViewer debug:', { code: task.code, projectTask, task });
    const assignee = projectTask?.assignee ?? task.assignee ?? '—';
    const creator = projectTask?.creator ?? task.creator ?? '—';

    return (
        <div className="task-container-viewer">
            <div className="task-header">
                <div className="task-tag">{task.code}</div>
                <h2>{task.title}</h2>
                <button className="close-button" onClick={onClose}>×</button>
            </div>

            <div className="task-info-grid">
                <div className="info-item"><span className="info-label">Статус:</span><span className="info-value">{task.status}</span></div>
                <div className="info-item"><span className="info-label">Приоритет:</span><span className="info-value">{task.priority}</span></div>
                <div className="info-item"><span className="info-label">Тип:</span><span className="info-value">{task.taskType}</span></div>
                <div className="info-item"><span className="info-label">Оценка:</span><span className="info-value">{task.estimation ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Спринт:</span><span className="info-value">{task.sprintId ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Проект:</span><span className="info-value">{task.projectId ?? '—'}</span></div>
                <div className="info-item"><span className="info-label">Создатель:</span><span className="info-value">{creator}</span></div>
                <div className="info-item"><span className="info-label">Исполнитель:</span><span className="info-value">{assignee}</span></div>
                <div className="info-item"><span className="info-label">Дата создания:</span><span className="info-value">{formatDateLocal(task.creationDate)}</span></div>
                <div className="info-item"><span className="info-label">Дата изменения:</span><span className="info-value">{formatDateLocal(task.updateDate)}</span></div>
            </div>

            <div className="task-description">
                <div className="info-label">Описание</div>
                <div className="description-content">{task.description}</div>
            </div>
        </div>
    );
};

export default TaskViewer; 