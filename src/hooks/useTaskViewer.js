import { useState, useCallback } from 'react';
import { API_ENDPOINTS, authFetch } from '../config/api';

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
            if (!response.ok) throw new Error('Failed to fetch task details');
            const fullTask = await response.json();
            setSelectedTask(fullTask.task);
            setIsSidebarOpen(true);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    const closeTask = useCallback(() => {
        setIsSidebarOpen(false);
        setSelectedTask(null);
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