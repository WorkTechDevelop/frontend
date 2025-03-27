import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Home.scss';


const statusDisplayNames = {
    'TODO': 'TO DO',
    'IN_PROGRESS': 'IN PROGRESS',
    'REVIEW': 'REVIEW',
    'DONE': 'DONE'
};

const priorityColors = {
    'BLOCKER': '#2f80fa', 
    'HIGH': '#fc6969',
    'MEDIUM': '#ffbd43b8',
    'LOW': '#63d562a3'
};

const TaskItem = ({ task, provided }) => (
    <div
        className="task-item"
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

const TaskColumn = ({ columnId, tasks, provided }) => (
    <div className={`task-column ${columnId.toLowerCase().replace('_', '-')}`}>
        <ColumnHeader title={columnId} count={tasks.length} />
        <div className="task-column__divider" />
        <TaskList tasks={tasks} provided={provided} />
    </div>
);

const ColumnHeader = ({ title, count }) => (
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

const Home = () => {

    const [tasks, setTasks] = useState({
        'TODO': [],
        'IN_PROGRESS': [],
        'REVIEW': [],
        'DONE': []
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://91.211.249.37:31055/work-task/v1/task/project-tasks/project-id-456', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }

            const tasksData = await response.json();
            console.log(tasksData)



            const groupedTasks = {
                'TODO': [],
                'IN_PROGRESS': [],
                'REVIEW': [],
                'DONE': []
            };



            tasksData.forEach(task => {
                const formattedTask = {
                    id: task.id,
                    tag: `WRK-TSK: ${task.id?.slice(0, 4)}`,
                    title: task.title,
                    assignee: task.assignee || 'Не назначен',
                    count: task.estimation,
                    description: task.description,
                    priority: task.priority,
                    status: task.status,
                    taskType: task.taskType
                };

            
                if (groupedTasks[task.status]) {
                    groupedTasks[task.status].push(formattedTask);
                }
            });

            setTasks(groupedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }

        
    };

    const handleDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        const task = tasks[source.droppableId][source.index];
        const newTasks = { ...tasks };

        newTasks[source.droppableId].splice(source.index, 1);
        newTasks[destination.droppableId].splice(destination.index, 0, task);

        setTasks(newTasks);

        try {
            const response = await fetch('http://91.211.249.37:31055/work-task/v1/task/update-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
                },
                body: JSON.stringify({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    creator: task.creator,
                    assignee: task.assignee,
                    projectId: "project-id-456",
                    taskType: task.taskType,
                    estimation: task.count,
                    status: destination.droppableId,
                })
            });


            if (!response.ok) {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
            setTasks(tasks);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <main className="home">
                <section className="task-columns">
                    {Object.entries(tasks).map(([columnId, columnTasks]) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <TaskColumn
                                    columnId={columnId}
                                    tasks={columnTasks}
                                    provided={provided}
                                />
                            )}
                        </Droppable>
                    ))}
                </section>
            </main>
        </DragDropContext>
    );
};

export default Home;