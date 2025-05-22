import React, { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn/TaskColumn'
import TaskViewer from './TaskViewer/TaskViewer';
import { API_ENDPOINTS, authFetch } from '../../config/api';
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

    const handleTaskClick = async (task) => {
        try {
            const response = await authFetch(API_ENDPOINTS.GET_TASK_BY_CODE(task.code), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) throw new Error('Failed to fetch task details');
            const fullTask = await response.json();
            setSelectedTask(fullTask.task);
            setIsSidebarOpen(true);
        } catch (error) {
            console.error('Ошибка загрузки задачи:', error);
        }
    };

    const fetchUserProjects = useCallback(async () => {
        try {
            const response = await authFetch(API_ENDPOINTS.GET_USERS_PROJECTS, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
        try {
            const response = await authFetch(API_ENDPOINTS.GET_PROJECT_TASKS(projectId), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const tasksData = await response.json();
            const groupedTasks = {
                'TODO': [],
                'IN_PROGRESS': [],
                'REVIEW': [],
                'DONE': []
            };
            tasksData.forEach(task => {
                const formattedTask = {
                    id: task.id,
                    tag: task.code,
                    code: task.code,
                    title: task.title,
                    assignee: task.assignee || 'Не назначен',
                    count: task.estimation,
                    description: task.description,
                    priority: task.priority,
                    status: task.status,
                    taskType: task.taskType,
                    estimation: task.estimation
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
            const response = await authFetch(API_ENDPOINTS.UPDATE_TASK_STATUS, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: task.code,
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