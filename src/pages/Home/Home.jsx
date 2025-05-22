import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskColumn from '../../components/tasks/TaskColumn';
import TaskViewer from '../../components/tasks/TaskViewer';
import { useProjects } from '../../hooks/useProjects';
import { useTasks } from '../../hooks/useTasks';
import { useTaskViewer } from '../../hooks/useTaskViewer';
import './Home.scss';
import { Drawer } from '@mui/material';

const Home = () => {
    const {
        currentProject,
        fetchProjects,
    } = useProjects();

    const {
        tasks,
        setTasks,
        fetchTasks,
        updateTaskStatus,
    } = useTasks();

    const {
        isSidebarOpen,
        selectedTask,
        openTask,
        closeTask,
    } = useTaskViewer();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    useEffect(() => {
        if (currentProject && currentProject.projectId) {
            fetchTasks(currentProject.projectId);
        }
    }, [currentProject, fetchTasks]);

    const handleTaskClick = openTask;

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
            await updateTaskStatus(task.code, destination.droppableId);
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
                onClose={closeTask}
            >
                <div className="task-drawer-content">
                    <TaskViewer 
                        task={selectedTask} 
                        onClose={closeTask} 
                    />
                </div>
            </Drawer>
        </>
    );
};

export default Home;