import { useState, useCallback } from 'react';
import { API_ENDPOINTS, authFetch } from '../config/api';

export function useProjects() {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await authFetch(API_ENDPOINTS.GET_USERS_PROJECTS, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to fetch user projects');
            const data = await response.json();
            setProjects(data);
            if (data && data.length > 0) {
                setCurrentProject(data[0]);
                localStorage.setItem('currentProjectId', data[0].projectId);
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        projects,
        currentProject,
        setCurrentProject,
        fetchProjects,
        loading,
        error
    };
} 