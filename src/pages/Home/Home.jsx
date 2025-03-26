import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Home.scss';


const TaskItem = ({ task, provided }) => (
    <div
        className="task-item"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
    >
        <div className="task-item__tag">{task.tag}</div>
        <div className="task-item__title">{task.title}</div>
        <div className="task-item__footer">
            <div className="task-item__assignee">{task.assignee}</div>
            <div className="task-item__count">{task.count}</div>
        </div>
    </div>
);

const TaskColumn = ({ columnId, tasks, provided }) => (
    <div className={`task-column ${columnId}`}>
        <ColumnHeader title={columnId} count={tasks.length} />
        <div className="task-column__divider" />
        <TaskList tasks={tasks} provided={provided} />
    </div>
);

const ColumnHeader = ({ title, count }) => (
    <div className="task-column__header">
        <h3>{title.replace('-', ' ').toUpperCase()}</h3>
        <div className="task-column__header-count-tasks">
            {count}
        </div>
    </div>
);

const TaskList = ({ tasks, provided }) => (
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
                    <TaskItem task={task} provided={provided} />
                )}
            </Draggable>
        ))}
        {provided.placeholder}
    </div>
);

const Home = () => {

    const [tasks, setTasks] = useState({
        'to-do': [
            {
                id: '1',
                tag: 'SVG-1508',
                title: 'Создание меню для приоритизации задач',
                assignee: 'Владислав',
                count: 2
            },
            {
                id: '2',
                tag: 'SVG-1509',
                title: 'Разработка компонента навигации',
                assignee: 'Владислав',
                count: 3
            }
        ],
        'in-progress': [
            {
                id: '3',
                tag: 'SVG-1510',
                title: 'Реализация drag-and-drop функционала',
                assignee: 'Владислав',
                count: 1
            }
        ],
        'review': [
            {
                id: '4',
                tag: 'SVG-1511',
                title: 'Тестирование функционала перетаскивания',
                assignee: 'Владислав',
                count: 4
            }
        ],
        'done': []
    });

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
                    id: "9702c6c6-e479-4736-a4f3-32f5bc5de936",
                    title: "Новый тайтл",
                    description: "Новый дискрипшн",
                    priority: "HIGH",
                    creator: "45e6e595-a16e-48a2-9640-e002abb0aa60",
                    assignee: "",
                    projectId: "project-id-456",
                    taskType: "BUG",
                    estimation: "5",
                    status: "TODO",
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update task status');
            }
        } catch (error) {
            console.error('Error updating task status:', error);
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