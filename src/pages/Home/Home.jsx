import React, { useState, useEffect, useRef } from 'react';
import './Home.scss';
import { FiChevronDown } from 'react-icons/fi';
import { taskService, authService, projectService } from '../../services/api';

const Home = () => {
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, cardId: null });
    const contextMenuRef = useRef(null);
    const [filterByName, setFilterByName] = useState(true);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [selectedPriorities, setSelectedPriorities] = useState(['LOW', 'MEDIUM', 'HIGH']);
    const [selectedTypes, setSelectedTypes] = useState(['TASK', 'BUG', 'STORY']);
    const [appliedFilters, setAppliedFilters] = useState({});
    const [priorityButtons, setPriorityButtons] = useState([
        { id: 'low', label: 'LOW', active: false },
        { id: 'medium', label: 'MEDIUM', active: true },
        { id: 'high', label: 'HIGH', active: true }
    ]);
    const [taskTypeButtons, setTaskTypeButtons] = useState([
        { id: 'task', label: 'TASK', active: true },
        { id: 'bug', label: 'BUG', active: true },
        { id: 'story', label: 'STORY', active: false }
    ]);

    const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
    const [assigneeDropdownOpen, setAssigneeDropdownOpen] = useState(false);
    
    const projectDropdownRef = useRef(null);
    const assigneeDropdownRef = useRef(null);

    // Состояние для данных из API
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [tasksByUser, setTasksByUser] = useState({});
    const [userIdToName, setUserIdToName] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [apiUsers, setApiUsers] = useState([]);

    // Состояние для колонок
    const [columns] = useState([
        { id: 'todo', title: 'TO DO' },
        { id: 'inProgress', title: 'IN PROGRESS' },
        { id: 'review', title: 'REVIEW' },
        { id: 'done', title: 'DONE' }
    ]);

    // Drag & Drop state
    const [draggedTask, setDraggedTask] = useState(null);

    // Загрузка проектов из настоящего API (all-user-project)
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const allProjects = await projectService.getAllUserProjects();
                setProjects(allProjects.map(p => ({
                    id: p.projectId,
                    name: p.projectName,
                    checked: true
                })));
                // Если есть хотя бы один проект, выбираем первый по умолчанию
                if (allProjects.length > 0) {
                    setSelectedProjectId(allProjects[0].projectId);
                }
            } catch (err) {
                setError('Ошибка при загрузке проектов');
            }
        };
        fetchProjects();
    }, []);

    // Загрузка задач для активного проекта и формирование users из assignee
    const fetchTasks = async () => {
        if (!authService.isAuthenticated()) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await taskService.getTasksInProject();
            let allTasks = [];
            const userIdToNameMap = {};
            (response || []).forEach(userBlock => {
                if (userBlock.userName && userBlock.tasks) {
                    userBlock.tasks.forEach(task => {
                        userIdToNameMap[task.assignee] = userBlock.userName;
                    });
                }
                allTasks = allTasks.concat(userBlock.tasks || []);
            });
            setTasks(allTasks);
            setUserIdToName(userIdToNameMap);
            // Формируем список пользователей из задач
            const usersFromTasks = [];
            allTasks.forEach(task => {
                const assigneeId = task.assignee;
                const assigneeName = userIdToNameMap[assigneeId] || assigneeId;
                if (assigneeId && !usersFromTasks.find(u => u.id === assigneeId)) {
                    usersFromTasks.push({
                        id: assigneeId,
                        name: assigneeName,
                        checked: true
                    });
                }
            });
            setUsers(usersFromTasks);
            setLoading(false);
        } catch (err) {
            setError('Ошибка при загрузке задач');
            setLoading(false);
        }
    };

    // Загружаем задачи при первом выборе проекта или смене выбранного проекта
    useEffect(() => {
        const setAndFetch = async () => {
            if (selectedProjectId) {
                try {
                    await projectService.setActiveProject(selectedProjectId);
                    await fetchTasks();
                } catch (err) {
                    setError('Ошибка при выборе проекта');
                }
            }
        };
        setAndFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProjectId]);

    useEffect(() => {
        // Close context menu when clicking outside
        const handleClickOutside = (event) => {
            // Close context menu if clicking outside
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
                setContextMenu({ ...contextMenu, visible: false });
            }
            
            // Close project dropdown if clicking outside
            if (projectDropdownRef.current && !projectDropdownRef.current.contains(event.target)) {
                setProjectDropdownOpen(false);
            }
            
            // Close assignee dropdown if clicking outside
            if (assigneeDropdownRef.current && !assigneeDropdownRef.current.contains(event.target)) {
                setAssigneeDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contextMenu]);

    // Handle right click on card
    const handleContextMenu = (e, cardId) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            cardId: cardId
        });
    };

    // --- Обработчики фильтров ---
    const handleProjectChange = (e) => {
        setSelectedProjectId(e.target.value);
    };
    const handleUserCheckChange = (userId) => {
        setSelectedUserIds(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
    };
    const togglePriorityButton = (priority) => {
        setPriorityButtons(prev => prev.map(btn => 
            btn.label === priority ? { ...btn, active: !btn.active } : btn
        ));
        setSelectedPriorities(prev => prev.includes(priority)
            ? prev.filter(p => p !== priority)
            : [...prev, priority]);
    };
    const toggleTaskTypeButton = (type) => {
        setTaskTypeButtons(prev => prev.map(btn => 
            btn.label === type ? { ...btn, active: !btn.active } : btn
        ));
        setSelectedTypes(prev => prev.includes(type)
            ? prev.filter(t => t !== type)
            : [...prev, type]);
    };
    const handleApplyFilters = () => {
        setAppliedFilters({
            projectIds: selectedProjectId ? [selectedProjectId] : projects.map(p => p.id),
            userIds: selectedUserIds.length ? selectedUserIds : users.map(u => u.id),
            priorities: selectedPriorities.length ? selectedPriorities : ['LOW', 'MEDIUM', 'HIGH'],
            types: selectedTypes.length ? selectedTypes : ['TASK', 'BUG', 'STORY']
        });
    };
    const handleClearFilters = () => {
        setSelectedProjectId('');
        setSelectedUserIds([]);
        setSelectedPriorities(['LOW', 'MEDIUM', 'HIGH']);
        setSelectedTypes(['TASK', 'BUG', 'STORY']);
        setPriorityButtons([
            { id: 'low', label: 'LOW', active: true },
            { id: 'medium', label: 'MEDIUM', active: true },
            { id: 'high', label: 'HIGH', active: true }
        ]);
        setTaskTypeButtons([
            { id: 'task', label: 'TASK', active: true },
            { id: 'bug', label: 'BUG', active: true },
            { id: 'story', label: 'STORY', active: true }
        ]);
        setAppliedFilters({
            projectIds: projects.map(p => p.id),
            userIds: users.map(u => u.id),
            priorities: ['LOW', 'MEDIUM', 'HIGH'],
            types: ['TASK', 'BUG', 'STORY']
        });
    };

    // --- Фильтрация задач ---
    const filteredTasks = tasks.filter(task => {
        if (appliedFilters.projectIds && !appliedFilters.projectIds.includes(task.projectId)) return false;
        if (appliedFilters.userIds && !appliedFilters.userIds.includes(task.assignee)) return false;
        if (appliedFilters.priorities && !appliedFilters.priorities.includes((task.priority || '').toUpperCase())) return false;
        if (appliedFilters.types && !appliedFilters.types.includes((task.taskType || '').toUpperCase())) return false;
        return true;
    });

    // --- Группировка задач по исполнителю ---
    const groupTasksByAssignee = (tasksArr) => {
        const map = {};
        tasksArr.forEach(task => {
            const assigneeId = task.assignee || 'unassigned';
            if (!map[assigneeId]) map[assigneeId] = [];
            map[assigneeId].push(task);
        });
        return map;
    };

    // --- Улучшенная карточка задачи ---
    const getTaskStatus = (task) => {
        const status = (task.status || '').toLowerCase();
        if (status === 'todo') return 'todo';
        if (status === 'in_progress' || status === 'in progress') return 'inProgress';
        if (status === 'review') return 'review';
        if (status === 'done' || status === 'completed') return 'done';
        return 'todo';
    };

    const getTaskColor = (task) => {
        const priority = (task.priority || '').toLowerCase();
        if (priority === 'high') return 'red';
        if (priority === 'medium') return 'yellow';
        return 'green';
    };

    const getAssigneeName = (assigneeId) => {
        if (!assigneeId) return 'Не назначен';
        return userIdToName[assigneeId] || assigneeId;
    };

    const getTypeLabel = (type) => {
        if (!type) return '';
        if (type.toUpperCase() === 'BUG') return '🐞 BUG';
        if (type.toUpperCase() === 'TASK') return '📝 TASK';
        if (type.toUpperCase() === 'STORY') return '📖 STORY';
        return type;
    };

    const handleDragStart = (task) => {
        setDraggedTask(task);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (columnId) => {
        if (!draggedTask) return;
        let newStatus = '';
        if (columnId === 'todo') newStatus = 'TODO';
        else if (columnId === 'inProgress') newStatus = 'IN_PROGRESS';
        else if (columnId === 'review') newStatus = 'REVIEW';
        else if (columnId === 'done') newStatus = 'DONE';
        if ((draggedTask.status || '').toUpperCase() === newStatus) {
            setDraggedTask(null);
            return;
        }
        try {
            // Сначала обновляем токен
            const refreshResp = await fetch('http://91.211.249.37/test/work-task/v1/auth/refresh', {
                method: 'POST',
                credentials: 'include'
            });
            if (!refreshResp.ok) {
                alert('Ошибка авторизации. Пожалуйста, войдите заново.');
                setDraggedTask(null);
                return;
            }
            // Теперь основной запрос
            await fetch('http://91.211.249.37/test/work-task/v1/task/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: draggedTask.code, status: newStatus }),
                credentials: 'include'
            });
            await fetchTasks();
        } catch (e) {
            alert('Ошибка при обновлении статуса задачи');
        }
        setDraggedTask(null);
    };

    const renderTaskCards = (columnId) => {
        const columnTasks = filteredTasks.filter(task => getTaskStatus(task) === columnId);
        if (filterByName) {
            const grouped = groupTasksByAssignee(columnTasks);
            return Object.entries(grouped).map(([assigneeId, tasks]) => (
                <div key={assigneeId} className="user-section">
                    <div className="user-header">
                        <span className="user-name">{getAssigneeName(assigneeId)}</span>
                        <span className="task-count">{tasks.length}</span>
                    </div>
                    {tasks.map(task => (
                        <div
                            key={task.id}
                            className="task-card"
                            style={{borderLeft: `4px solid ${getTaskColor(task)}`}}
                            draggable
                            onDragStart={() => handleDragStart(task)}
                        >
                            <div className="card-header" style={{display: 'flex', alignItems: 'center', gap: 8}}>
                                <span className={`task-id ${getTaskColor(task)}`}>{task.code || task.id}</span>
                                <span style={{fontSize: 12, color: '#888'}}>{getTypeLabel(task.taskType)}</span>
                                <span style={{marginLeft: 'auto', fontWeight: 600, color: getTaskColor(task)}}>{(task.priority || '').toUpperCase()}</span>
                            </div>
                            <div className="card-title" style={{fontWeight: 600}}>{task.title || 'Без названия'}</div>
                            <div className="card-desc" style={{fontSize: 13, color: '#666', margin: '4px 0'}}>{task.description}</div>
                            <div className="card-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12}}>
                                <span className="assignee">👤 {getAssigneeName(task.assignee)}</span>
                                <span>⏱ {task.estimation || 0}ч</span>
                            </div>
                        </div>
                    ))}
                </div>
            ));
        } else {
            return columnTasks.map(task => (
                <div
                    key={task.id}
                    className="task-card"
                    style={{borderLeft: `4px solid ${getTaskColor(task)}`}}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                >
                    <div className="card-header" style={{display: 'flex', alignItems: 'center', gap: 8}}>
                        <span className={`task-id ${getTaskColor(task)}`}>{task.code || task.id}</span>
                        <span style={{fontSize: 12, color: '#888'}}>{getTypeLabel(task.taskType)}</span>
                        <span style={{marginLeft: 'auto', fontWeight: 600, color: getTaskColor(task)}}>{(task.priority || '').toUpperCase()}</span>
                    </div>
                    <div className="card-title" style={{fontWeight: 600}}>{task.title || 'Без названия'}</div>
                    <div className="card-desc" style={{fontSize: 13, color: '#666', margin: '4px 0'}}>{task.description}</div>
                    <div className="card-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12}}>
                        <span className="assignee">👤 {getAssigneeName(task.assignee)}</span>
                        <span>⏱ {task.estimation || 0}ч</span>
                    </div>
                </div>
            ));
        }
    };

    const toggleFilterByName = () => {
        setFilterByName(!filterByName);
    };

    const handleProjectCheckChange = (projectId) => {
        setProjects(projects.map(project => 
            project.id === projectId ? { ...project, checked: !project.checked } : project
        ));
    };

    const toggleProjectDropdown = () => {
        setProjectDropdownOpen(!projectDropdownOpen);
        setAssigneeDropdownOpen(false);
    };
    
    const toggleAssigneeDropdown = () => {
        setAssigneeDropdownOpen(!assigneeDropdownOpen);
        setProjectDropdownOpen(false);
    };

    const getSelectedProjects = () => {
        return projects.filter(p => p.checked).map(p => p.name).join(', ');
    };
    
    const getSelectedUsers = () => {
        return users.filter(u => u.checked).map(u => u.name).join(', ');
    };
    
    const selectAllProjects = (value) => {
        setProjects(projects.map(project => ({ ...project, checked: value })));
    };
    
    const selectAllUsers = (value) => {
        setUsers(users.map(user => ({ ...user, checked: value })));
    };

    return (
        <div className="home-container">
            <div className="sidebar">
                <div className="filters-section">
                    <h3>ФИЛЬТРЫ</h3>
                    <div className="filter-toggle">
                        <span>Фильтрация по ФИО</span>
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={filterByName} 
                                onChange={toggleFilterByName}
                                id="filter-by-name"
                                name="filter-by-name"
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <div className="filter-group">
                        <h4>Проект:</h4>
                        <div className="dropdown-selector" ref={projectDropdownRef}>
                            <div 
                                className="dropdown-header" 
                                onClick={toggleProjectDropdown}
                            >
                                <div className="selected-text">
                                    {getSelectedProjects() || 'Выберите проект'}
                                </div>
                                <FiChevronDown className="dropdown-icon" />
                            </div>
                            {projectDropdownOpen && (
                                <div className="dropdown-content">
                                    <div className="dropdown-actions">
                                        <button 
                                            className="select-all" 
                                            onClick={() => selectAllProjects(true)}
                                        >
                                            Выбрать все
                                        </button>
                                        <button 
                                            className="clear-all" 
                                            onClick={() => selectAllProjects(false)}
                                        >
                                            Очистить все
                                        </button>
                                    </div>
                                    {projects.map(project => (
                                        <label key={project.id} className="dropdown-item">
                                            <input 
                                                type="checkbox" 
                                                checked={project.checked}
                                                onChange={() => handleProjectCheckChange(project.id)}
                                                id={`project-${project.id}`}
                                                name={`project-${project.id}`}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="item-label">{project.name}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="filter-group">
                        <h4>Исполнитель:</h4>
                        <div className="dropdown-selector" ref={assigneeDropdownRef}>
                            <div 
                                className="dropdown-header" 
                                onClick={toggleAssigneeDropdown}
                            >
                                <div className="selected-text">
                                    {getSelectedUsers() || 'Выберите исполнителя'}
                                </div>
                                <FiChevronDown className="dropdown-icon" />
                            </div>
                            {assigneeDropdownOpen && (
                                <div className="dropdown-content">
                                    <div className="dropdown-actions">
                                        <button 
                                            className="select-all" 
                                            onClick={() => selectAllUsers(true)}
                                        >
                                            Выбрать все
                                        </button>
                                        <button 
                                            className="clear-all" 
                                            onClick={() => selectAllUsers(false)}
                                        >
                                            Очистить все
                                        </button>
                                    </div>
                                    {users.map(user => (
                                        <label key={user.id} className="dropdown-item">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedUserIds.includes(user.id)}
                                                onChange={() => handleUserCheckChange(user.id)}
                                                id={`user-${user.id}`}
                                                name={`user-${user.id}`}
                                            />
                                            <span className="checkmark"></span>
                                            <span className="item-label">{user.name}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="filter-group">
                        <h4>Приоритет:</h4>
                        <div className="priority-buttons">
                            {priorityButtons.map(btn => (
                                <button 
                                    key={btn.id}
                                    className={`priority-btn ${btn.id} ${btn.active ? 'active' : ''}`}
                                    onClick={() => togglePriorityButton(btn.label)}
                                    id={`priority-${btn.id}`}
                                    name={`priority-${btn.id}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="filter-group">
                        <h4>Тип задачи:</h4>
                        <div className="task-type-buttons">
                            {taskTypeButtons.map(btn => (
                                <button 
                                    key={btn.id}
                                    className={`task-type-btn ${btn.active ? 'active' : ''}`}
                                    onClick={() => toggleTaskTypeButton(btn.label)}
                                    id={`task-type-${btn.id}`}
                                    name={`task-type-${btn.id}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="filter-actions">
                        <button className="apply-btn" id="apply-filters" name="apply-filters" onClick={handleApplyFilters}>Применить</button>
                        <button className="clear-btn" id="clear-filters" name="clear-filters" onClick={handleClearFilters}>Очистить</button>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="project-title">WORK-TASK</div>
                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Загрузка задач...</p>
                    </div>
                )}
                {error && (
                    <div className="error-container">
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>Попробовать снова</button>
                    </div>
                )}
                {!loading && !error && (
                    <div className="board-container">
                        <div className="column-headers">
                            {columns.map(column => (
                                <div key={column.id} className="column-header">{column.title}</div>
                            ))}
                        </div>
                        <div className="kanban-board">
                            {columns.map(column => (
                                <div
                                    key={column.id}
                                    className="kanban-column"
                                    onDragOver={handleDragOver}
                                    onDrop={() => handleDrop(column.id)}
                                >
                                    {renderTaskCards(column.id)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {contextMenu.visible && (
                <div 
                    ref={contextMenuRef}
                    className="context-menu" 
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <ul>
                        <li>Копировать</li>
                        <li>Назначить</li>
                        <li>Изменить спринт</li>
                        <li>Удалить</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;