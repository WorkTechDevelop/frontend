import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn/TaskColumn'
import { API_ENDPOINTS } from '../../config/api';
import './Home.scss';

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
            const response = await fetch(API_ENDPOINTS.GET_PROJECT_TASKS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
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
            const response = await fetch(API_ENDPOINTS.UPDATE_TASK, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
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