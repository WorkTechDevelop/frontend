import React from 'react';
import TaskItem from './TaskItem';
import { Draggable } from '@hello-pangea/dnd';
import './TaskColumn.scss';

// Отображение названий статусов
const STATUS_DISPLAY_NAMES = {
    'TODO': 'TO DO',
    'IN_PROGRESS': 'IN PROGRESS',
    'REVIEW': 'REVIEW',
    'DONE': 'DONE'
};

// Заголовок колонки
const ColumnHeader = ({ title, count }) => (
    <div className="task-column__header">
        <h3>{STATUS_DISPLAY_NAMES[title] || title}</h3>
        {count > 0 && <span className="task-count">({count})</span>}
    </div>
);

// Список задач
const TaskList = ({ tasks, provided, onTaskClick, columnId }) => (
    <div
        className="task-container"
        ref={provided.innerRef}
        {...provided.droppableProps}
    >
        {tasks.map((task, index) => (
            <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
            >
                {(provided) => (
                    <TaskItem 
                        task={task} 
                        provided={provided} 
                        onTaskClick={() => onTaskClick(task, columnId)} 
                    />
                )}
            </Draggable>
        ))}
        {provided.placeholder}
    </div>
);

// Основной компонент колонки
const TaskColumn = ({ columnId, tasks, provided, onTaskClick }) => (
    <div className={`task-column ${columnId.toLowerCase().replace('_', '-')}`}>
        <ColumnHeader title={columnId} count={tasks.length} />
        <div className="task-column__divider" />
        <TaskList 
            tasks={tasks} 
            provided={provided} 
            onTaskClick={onTaskClick}
            columnId={columnId}
        />
    </div>
);

export default TaskColumn; 