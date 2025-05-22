import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn/TaskColumn'
import TaskViewer from './TaskViewer/TaskViewer';
import { API_ENDPOINTS } from '../../config/api';
import './Home.scss';
import { Drawer } from '@mui/material';

const Home = () => {
    const [tasks, setTasks] = useState({
        'TODO': [],
        'IN_PROGRESS': [],
        'REVIEW': [],
        'DONE': []
    });

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsSidebarOpen(true);
    };

    const fetchUserProjects = useCallback(async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('Authentication token not found. User might not be logged in.');
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.GET_USERS_PROJECTS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user projects');
            }

            const projects = await response.json();
            if (projects && projects.length > 0) {
                const firstProject = projects[0];
                localStorage.setItem('currentProjectId', firstProject.projectId);
                fetchTasks(firstProject.projectId);
            }
        } catch (error) {
            console.error('Error fetching user projects:', error);
        }
    }, []);

    const fetchTasks = async (projectId) => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            console.error('Authentication token not found. User might not be logged in.');
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.GET_PROJECT_TASKS(projectId), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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

    useEffect(() => {
        fetchUserProjects();
    }, [fetchUserProjects]);

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
            const response = await fetch(API_ENDPOINTS.UPDATE_TASK_STATUS, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    id: task.id,
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
        <>
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
                                        onTaskClick={handleTaskClick}
                                    />
                                )}
                            </Droppable>
                        ))}
                    </section>
                </main>
            </DragDropContext>

            <Drawer
                anchor="right"
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            >
                <div className="task-drawer-content">
                    <TaskViewer 
                        task={selectedTask} 
                        onClose={() => setIsSidebarOpen(false)} 
                    />
                </div>
            </Drawer>
        </>
    );
};

export default Home;