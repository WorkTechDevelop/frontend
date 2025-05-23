import React from 'react';
import './TaskItem.scss';

// Цвета приоритетов
const PRIORITY_COLORS = {
    'BLOCKER': '#2f80fa',
    'HIGH': '#fc6969',
    'MEDIUM': '#ffbd43b8',
    'LOW': '#63d562a3'
};

// Тег задачи
const TaskTag = ({ code, priority }) => (
    <div
        className="task-item__tag"
        style={{ backgroundColor: PRIORITY_COLORS[priority] }}
    >
        {code}
    </div>
);

// Футер задачи
const TaskFooter = ({ assignee, count }) => (
    <div className="task-item__footer">
        <div className="task-item__assignee">{assignee}</div>
        <div className="task-item__count">{count}</div>
    </div>
);

// Основной компонент задачи
const TaskItem = ({ task, provided, onTaskClick }) => (
    <div
        className="task-item"
        onClick={() => onTaskClick(task)}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        <TaskTag code={task.tag} priority={task.priority} />
        <div className="task-item__title">{task.title}</div>
        <TaskFooter assignee={task.assignee} count={task.count} />
    </div>
);

export default TaskItem; 