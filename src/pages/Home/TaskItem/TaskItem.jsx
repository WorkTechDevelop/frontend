import './TaskItem.scss';

const priorityColors = {
    'BLOCKER': '#2f80fa',
    'HIGH': '#fc6969',
    'MEDIUM': '#ffbd43b8',
    'LOW': '#63d562a3'
};

const TaskItem = ({ task, provided, onTaskClick }) => (
    <div
        className="task-item"
        onClick={() => onTaskClick(task)}
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        <div
            className="task-item__tag"
            style={{ backgroundColor: priorityColors[task.priority] }}
        >
            {task.tag}
        </div>

        <div className="task-item__title">{task.title}</div>
        <div className="task-item__footer">
            <div className="task-item__assignee">{task.assignee}</div>
            <div className="task-item__count">{task.count}</div>
        </div>
    </div>
);

export default TaskItem;