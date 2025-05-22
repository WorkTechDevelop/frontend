import { useState, useCallback } from 'react';
import { API_ENDPOINTS, authFetch } from '../config/api';

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
            if (!response.ok) throw new Error('Failed to fetch tasks');
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
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTaskStatus = useCallback(async (code, newStatus) => {
        setError(null);
        try {
            const response = await authFetch(API_ENDPOINTS.UPDATE_TASK_STATUS, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, status: newStatus })
            });
            if (!response.ok) throw new Error('Failed to update task status');
            // Можно добавить обновление задач локально или перезагрузить fetchTasks
        } catch (e) {
            setError(e);
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