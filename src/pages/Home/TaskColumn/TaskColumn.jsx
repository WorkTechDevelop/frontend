import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Draggable } from '@hello-pangea/dnd';
import './TaskColumn.scss'

const statusDisplayNames = {
    'TODO': 'TO DO',
    'IN_PROGRESS': 'IN PROGRESS',
    'REVIEW': 'REVIEW',
    'DONE': 'DONE'
};

const TaskColumn = ({ columnId, tasks, provided, onTaskClick }) => (
    <div className={`task-column ${columnId.toLowerCase().replace('_', '-')}`}>
        <ColumnHeader title={columnId} count={tasks.length} />
        <div className="task-column__divider" />
        <TaskList tasks={tasks} provided={provided} onTaskClick={onTaskClick} />
    </div>
);

const ColumnHeader = ({ title }) => (
    <div className="task-column__header">
        <h3>{statusDisplayNames[title] || title}</h3>
    </div>
);

const TaskList = ({ tasks, provided, onTaskClick }) => (
    <div
        className="task-container"
        ref={provided.innerRef}
        {...provided.droppableProps}
    >
        {tasks && tasks.filter(task => task).map((task, index) => (
            <Draggable
                key={task.id}
                draggableId={task.id}
                index={index}
            >
                {(provided) => (
                    <TaskItem task={task} provided={provided} onTaskClick={onTaskClick} />
                )}
            </Draggable>
        ))}
        {provided.placeholder}
    </div>
);

export default TaskColumn;