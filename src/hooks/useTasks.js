import { useState, useCallback } from 'react';
import { API_ENDPOINTS, authFetch } from '../config/api';
import { ErrorTypes } from '../utils/errorHandler';

export function useTasks() {
    const [tasks, setTasks] = useState({
        'TODO': [],
        'IN_PROGRESS': [],
        'REVIEW': [],
        'DONE': []
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = useCallback(async (projectId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authFetch(API_ENDPOINTS.GET_PROJECT_TASKS(projectId), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
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
        } catch (e) {
            setError(e);
            // Показываем пользователю сообщение об ошибке в зависимости от типа
            if (e.type === ErrorTypes.NETWORK) {
                console.error('Ошибка сети при загрузке задач');
            } else if (e.type === ErrorTypes.AUTH) {
                console.error('Ошибка авторизации при загрузке задач');
            } else {
                console.error('Ошибка при загрузке задач:', e.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTaskStatus = useCallback(async (code, newStatus) => {
        setError(null);
        try {
            await authFetch(API_ENDPOINTS.UPDATE_TASK_STATUS, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, status: newStatus })
            });
            
            // Обновляем локальное состояние задач
            setTasks(prevTasks => {
                const newTasks = { ...prevTasks };
                // Находим задачу в текущем статусе
                for (const status in newTasks) {
                    const taskIndex = newTasks[status].findIndex(task => task.code === code);
                    if (taskIndex !== -1) {
                        // Удаляем задачу из текущего статуса
                        const [task] = newTasks[status].splice(taskIndex, 1);
                        // Обновляем статус задачи
                        task.status = newStatus;
                        // Добавляем задачу в новый статус
                        newTasks[newStatus].push(task);
                        break;
                    }
                }
                return newTasks;
            });
        } catch (e) {
            setError(e);
            // Показываем пользователю сообщение об ошибке в зависимости от типа
            if (e.type === ErrorTypes.NETWORK) {
                console.error('Ошибка сети при обновлении статуса задачи');
            } else if (e.type === ErrorTypes.AUTH) {
                console.error('Ошибка авторизации при обновлении статуса задачи');
            } else {
                console.error('Ошибка при обновлении статуса задачи:', e.message);
            }
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