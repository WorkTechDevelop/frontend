import TaskItem from '../TaskItem/TaskItem';
import './TaskColumn.scss'

import { Draggable } from 'react-beautiful-dnd';

const statusDisplayNames = {
    'TODO': 'TO DO',
    'IN_PROGRESS': 'IN PROGRESS',
    'REVIEW': 'REVIEW',
    'DONE': 'DONE'
};

const TaskColumn = ({ columnId, tasks, provided }) => (
    <div className={`task-column ${columnId.toLowerCase().replace('_', '-')}`}>
        <ColumnHeader title={columnId} count={tasks.length} />
        <div className="task-column__divider" />
        <TaskList tasks={tasks} provided={provided} />
    </div>
);

const ColumnHeader = ({ title }) => (
    <div className="task-column__header">
        <h3>{statusDisplayNames[title] || title}</h3>
    </div>
);

const TaskList = ({ tasks, provided }) => (
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
                    <TaskItem task={task} provided={provided} />
                )}
            </Draggable>
        ))}
        {provided.placeholder}
    </div>
);

export default TaskColumn;