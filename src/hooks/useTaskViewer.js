import { useState, useCallback } from 'react';
import { API_ENDPOINTS, authFetch } from '../config/api';
import { ErrorTypes } from '../utils/errorHandler';

export function useTaskViewer() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openTask = useCallback(async (task) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authFetch(API_ENDPOINTS.GET_TASK_BY_CODE(task.code), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const fullTask = await response.json();
            setSelectedTask(fullTask.task);
            setIsSidebarOpen(true);
        } catch (e) {
            setError(e);
            // Показываем пользователю сообщение об ошибке в зависимости от типа
            if (e.type === ErrorTypes.NETWORK) {
                console.error('Ошибка сети при загрузке деталей задачи');
            } else if (e.type === ErrorTypes.AUTH) {
                console.error('Ошибка авторизации при загрузке деталей задачи');
            } else if (e.type === ErrorTypes.NOT_FOUND) {
                console.error('Задача не найдена');
            } else {
                console.error('Ошибка при загрузке деталей задачи:', e.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const closeTask = useCallback(() => {
        setIsSidebarOpen(false);
        setSelectedTask(null);
        setError(null);
    }, []);

    return {
        isSidebarOpen,
        selectedTask,
        openTask,
        closeTask,
        loading,
        error
    };
} 