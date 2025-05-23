import { useState, useCallback } from 'react';
import { API_ENDPOINTS, authFetch } from '../config/api';

// Начальное состояние для просмотрщика задач
const initialState = {
    isOpen: false,
    task: null,
    loading: false,
    error: null
};

export function useTaskViewer() {
    const [state, setState] = useState(initialState);

    // Открытие задачи
    const openTask = useCallback(async (task) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        try {
            const response = await authFetch(API_ENDPOINTS.GET_TASK_BY_CODE(task.code), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setState({
                isOpen: true,
                task: data.task,
                loading: false,
                error: null
            });
        } catch (error) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: error.message || 'Ошибка при загрузке задачи'
            }));
            console.error('Ошибка при загрузке деталей задачи:', error);
        }
    }, []);

    // Закрытие задачи
    const closeTask = useCallback(() => {
        setState(initialState);
    }, []);

    return {
        isSidebarOpen: state.isOpen,
        selectedTask: state.task,
        openTask,
        closeTask,
        loading: state.loading,
        error: state.error
    };
} 