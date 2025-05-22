import { useState, useCallback } from 'react';
import { API_ENDPOINTS, authFetch } from '../config/api';

// Начальное состояние для задач
const initialTasksState = {
    'TODO': [],
    'IN_PROGRESS': [],
    'REVIEW': [],
    'DONE': []
};

// Форматирование задачи для отображения
const formatTask = (task) => ({
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
});

// Группировка задач по статусам
const groupTasksByStatus = (tasks) => {
    const groupedTasks = { ...initialTasksState };
    tasks.forEach(task => {
        const formattedTask = formatTask(task);
        if (groupedTasks[task.status]) {
            groupedTasks[task.status].push(formattedTask);
        }
    });
    return groupedTasks;
};

// Обновление задачи в списке
const updateTaskInList = (tasks, taskCode, newStatus) => {
    const newTasks = { ...tasks };
    for (const status in newTasks) {
        const taskIndex = newTasks[status].findIndex(task => task.code === taskCode);
        if (taskIndex !== -1) {
            const [task] = newTasks[status].splice(taskIndex, 1);
            task.status = newStatus;
            newTasks[newStatus].push(task);
            break;
        }
    }
    return newTasks;
};

export function useTasks() {
    const [tasks, setTasks] = useState(initialTasksState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Загрузка задач проекта
    const fetchTasks = useCallback(async (projectId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authFetch(API_ENDPOINTS.GET_PROJECT_TASKS(projectId), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const tasksData = await response.json();
            setTasks(groupTasksByStatus(tasksData));
        } catch (e) {
            setError(e);
            console.error('Ошибка при загрузке задач:', e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Обновление статуса задачи
    const updateTaskStatus = useCallback(async (code, newStatus, currentStatus) => {
        // Если статус не изменился, просто обновляем локальное состояние
        if (currentStatus === newStatus) {
            setTasks(prevTasks => updateTaskInList(prevTasks, code, newStatus));
            return;
        }

        setError(null);
        try {
            await authFetch(API_ENDPOINTS.UPDATE_TASK_STATUS, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, status: newStatus })
            });
            
            setTasks(prevTasks => updateTaskInList(prevTasks, code, newStatus));
        } catch (e) {
            setError(e);
            console.error('Ошибка при обновлении статуса задачи:', e.message);
        }
    }, []);

    return {
        tasks,
        setTasks,
        fetchTasks,
        updateTaskStatus,
        loading,
        error
    };
} 