import React, { useState, useEffect, useRef } from 'react';
import './Home.scss';
import { FiChevronDown, FiX, FiRefreshCw } from 'react-icons/fi';
import { taskService, projectService, authService } from '../../services/api';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Home = () => {
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, cardId: null });
    const contextMenuRef = useRef(null);
    const [filterByName, setFilterByName] = useState(true);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
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
    const [apiUsers, setApiUsers] = useState([]);
    const [activeProject, setActiveProject] = useState(null);
    const [availableProjects, setAvailableProjects] = useState([]);

    // Состояние для колонок
    const [columns] = useState([
        { id: 'todo', title: 'TO DO' },
        { id: 'inProgress', title: 'IN PROGRESS' },
        { id: 'review', title: 'REVIEW' },
        { id: 'done', title: 'DONE' }
    ]);

    // Загрузка списка проектов
    useEffect(() => {
        const fetchProjects = async () => {
            if (!authService.isAuthenticated()) {
                return;
            }

            try {
                // Загружаем список проектов пользователя
                const projectsResponse = await projectService.getAllUserProjects();
                if (projectsResponse && projectsResponse.projects) {
                    const projectsList = projectsResponse.projects.map(project => ({
                        id: project.id,
                        name: project.name,
                        checked: true
                    }));
                    setAvailableProjects(projectsList);
                    setProjects(projectsList);
                }

                // Получаем активный проект
                const activeProjectResponse = await projectService.getActiveProject();
                if (activeProjectResponse && activeProjectResponse.projectId) {
                    setActiveProject(activeProjectResponse.projectId);
                }
            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Ошибка при загрузке проектов');
            }
        };

        fetchProjects();
    }, []);

    // Загрузка задач после установки активного проекта
    useEffect(() => {
        const fetchTasks = async () => {
            if (!authService.isAuthenticated() || !activeProject) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await taskService.getTasksInProject();
                
                // Преобразуем данные и сохраняем в состояние
                setTasks(response.tasks || []);
                
                // Группируем задачи по пользователям
                const tasksByUserData = {};
                const usersData = [];
                
                if (response.tasksByUser) {
                    Object.keys(response.tasksByUser).forEach(userId => {
                        const userData = response.tasksByUser[userId];
                        if (userData.user) {
                            const userName = `${userData.user.firstName} ${userData.user.lastName}`;
                            const userTasks = userData.tasks || [];
                            tasksByUserData[userId] = { user: userData.user, tasks: userTasks };
                            
                            // Добавляем пользователя в список
                            usersData.push({
                                id: userData.user.id,
                                name: userName,
                                checked: true,
                                fullName: userName,
                                count: userTasks.length
                            });
                        }
                    });
                }
                
                setTasksByUser(tasksByUserData);
                
                // Если есть пользователи из API, обновляем список
                if (usersData.length > 0) {
                    setApiUsers(usersData);
                    setUsers(usersData);
                }
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setError('Ошибка при загрузке задач');
                setLoading(false);
            }
        };

        fetchTasks();
    }, [activeProject]);

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

    // Обработка перетаскивания карточек
    const handleDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        
        // Если нет места назначения или место назначения то же самое, то ничего не делаем
        if (!destination || 
            (source.droppableId === destination.droppableId && 
             source.index === destination.index)) {
            return;
        }
        
        // Получаем ID задачи из draggableId
        const taskId = draggableId.split('-')[1];
        
        // Определяем новый статус задачи
        let newStatus;
        switch(destination.droppableId) {
            case 'todo':
                newStatus = 'TODO';
                break;
            case 'inProgress':
                newStatus = 'IN_PROGRESS';
                break;
            case 'review':
                newStatus = 'REVIEW';
                break;
            case 'done':
                newStatus = 'DONE';
                break;
            default:
                newStatus = 'TODO';
        }
        
        try {
            // Обновляем статус задачи в API
            await taskService.updateTaskStatus({
                taskId: taskId,
                status: newStatus
            });
            
            // Обновляем данные локально
            const updatedTasksByUser = { ...tasksByUser };
            
            // Находим пользователя и задачу
            Object.keys(updatedTasksByUser).forEach(userId => {
                const userTasks = updatedTasksByUser[userId].tasks;
                const taskIndex = userTasks.findIndex(task => task.id === parseInt(taskId));
                
                if (taskIndex !== -1) {
                    // Обновляем статус задачи
                    updatedTasksByUser[userId].tasks[taskIndex].status = newStatus;
                }
            });
            
            // Обновляем состояние
            setTasksByUser(updatedTasksByUser);
        } catch (error) {
            console.error('Error updating task status:', error);
            // Показываем уведомление об ошибке
            setError('Ошибка при обновлении статуса задачи');
        }
    };

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

    // Обработка действий из контекстного меню
    const handleContextMenuAction = async (action) => {
        const taskId = contextMenu.cardId;
        
        switch(action) {
            case 'copy':
                // Копирование ID задачи в буфер обмена
                navigator.clipboard.writeText(taskId);
                break;
                
            case 'delete':
                // Здесь должна быть логика удаления задачи
                // API для удаления задачи не предоставлено
                break;
                
            default:
                break;
        }
        
        // Закрываем контекстное меню
        setContextMenu({ ...contextMenu, visible: false });
    };

    // Установка активного проекта
    const setProjectAsActive = async (projectId) => {
        try {
            await projectService.setActiveProject(projectId);
            setActiveProject(projectId);
        } catch (error) {
            console.error('Error setting active project:', error);
            setError('Ошибка при установке активного проекта');
        }
    };

    // Обновление данных
    const refreshData = async () => {
        try {
            setLoading(true);
            const response = await taskService.getTasksInProject();
            
            // Преобразуем данные и сохраняем в состояние
            setTasks(response.tasks || []);
            
            // Группируем задачи по пользователям
            const tasksByUserData = {};
            const usersData = [];
            
            if (response.tasksByUser) {
                Object.keys(response.tasksByUser).forEach(userId => {
                    const userData = response.tasksByUser[userId];
                    if (userData.user) {
                        const userName = `${userData.user.firstName} ${userData.user.lastName}`;
                        const userTasks = userData.tasks || [];
                        tasksByUserData[userId] = { user: userData.user, tasks: userTasks };
                        
                        // Добавляем пользователя в список
                        usersData.push({
                            id: userData.user.id,
                            name: userName,
                            checked: true,
                            fullName: userName,
                            count: userTasks.length
                        });
                    }
                });
            }
            
            setTasksByUser(tasksByUserData);
            
            // Если есть пользователи из API, обновляем список
            if (usersData.length > 0) {
                setApiUsers(usersData);
                setUsers(usersData);
            }
            
            setError(null);
            setLoading(false);
        } catch (err) {
            console.error('Error refreshing data:', err);
            setError('Ошибка при обновлении данных');
            setLoading(false);
        }
    };

    // Get task color based on priority
    const getTaskColor = (task) => {
        if (!task) return 'green';
        
        const priority = task.priority?.toLowerCase() || '';
        if (priority === 'high') return 'red';
        if (priority === 'medium') return 'yellow';
        return 'green';
    };

    // Функция для получения статуса задачи
    const getTaskStatus = (task) => {
        if (!task) return 'todo';
        
        const status = task.status?.toLowerCase() || '';
        if (status === 'in_progress' || status === 'in progress') return 'inProgress';
        if (status === 'review') return 'review';
        if (status === 'done' || status === 'completed') return 'done';
        return 'todo';
    };

    const toggleFilterByName = () => {
        setFilterByName(!filterByName);
    };

    const handleUserCheckChange = (userId) => {
        setUsers(users.map(user => 
            user.id === userId ? { ...user, checked: !user.checked } : user
        ));
    };

    const handleProjectCheckChange = (projectId) => {
        setProjects(projects.map(project => 
            project.id === projectId ? { ...project, checked: !project.checked } : project
        ));
    };

    const togglePriorityButton = (buttonId) => {
        setPriorityButtons(priorityButtons.map(btn => 
            btn.id === buttonId ? { ...btn, active: !btn.active } : btn
        ));
    };

    const toggleTaskTypeButton = (buttonId) => {
        setTaskTypeButtons(taskTypeButtons.map(btn => 
            btn.id === buttonId ? { ...btn, active: !btn.active } : btn
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

    // Получение активного проекта по ID
    const getActiveProjectName = () => {
        const project = availableProjects.find(p => p.id === activeProject);
        return project ? project.name : 'WORK-TASK';
    };

    // Функция для отображения карточек задач
    const renderTaskCards = (userId, columnId) => {
        // Если нет данных из API, возвращаем пустой массив
        if (!tasksByUser[userId]) return [];
        
        // Фильтруем задачи пользователя по колонке (статусу)
        return tasksByUser[userId].tasks
            .filter(task => getTaskStatus(task) === columnId)
            .map((task, index) => (
                <Draggable
                    key={`task-${task.id}`}
                    draggableId={`task-${task.id}`}
                    index={index}
                >
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-card" 
                            onContextMenu={(e) => handleContextMenu(e, task.id)}
                        >
                            <div className="card-header">
                                <span className={`task-id ${getTaskColor(task)}`}>
                                    {task.identifier || `SVD-${task.id}`}
                                </span>
                                <button className="more-options">⋯</button>
                            </div>
                            <div className="card-title">{task.title || 'Без названия'}</div>
                            <div className="card-footer">
                                <span className="assignee">
                                    {task.assignee?.name || tasksByUser[userId].user.firstName}
                                </span>
                                <span className="count">{task.comments?.length || 0}</span>
                            </div>
                        </div>
                    )}
                </Draggable>
            ));
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
                                    {availableProjects.map(project => (
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
                                            <button 
                                                className="set-active-btn"
                                                onClick={() => setProjectAsActive(project.id)}
                                                title="Установить как активный проект"
                                            >
                                                ★
                                            </button>
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
                                                checked={user.checked}
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
                                    onClick={() => togglePriorityButton(btn.id)}
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
                                    onClick={() => toggleTaskTypeButton(btn.id)}
                                    id={`task-type-${btn.id}`}
                                    name={`task-type-${btn.id}`}
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="filter-actions">
                        <button className="apply-btn" id="apply-filters" name="apply-filters">Применить</button>
                        <button className="clear-btn" id="clear-filters" name="clear-filters">Очистить</button>
                    </div>
                </div>
            </div>
            
            <div className="main-content">
                <div className="project-header">
                    <div className="project-title">{getActiveProjectName()}</div>
                    <button 
                        className="refresh-btn" 
                        onClick={refreshData}
                        disabled={loading}
                        title="Обновить данные"
                    >
                        <FiRefreshCw className={loading ? 'loading' : ''} />
                    </button>
                </div>
                
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
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="board-container">
                            <div className="column-headers">
                                {columns.map(column => (
                                    <div key={column.id} className="column-header">
                                        {column.title}
                                    </div>
                                ))}
                            </div>
                            
                            {Object.keys(tasksByUser).length > 0 ? (
                                // Рендерим данные из API
                                Object.keys(tasksByUser)
                                    .filter(userId => {
                                        const userObj = users.find(u => u.id === parseInt(userId));
                                        return userObj?.checked || false;
                                    })
                                    .map(userId => {
                                        const userData = tasksByUser[userId];
                                        const userName = `${userData.user.firstName} ${userData.user.lastName}`;
                                        const userCount = userData.tasks?.length || 0;
                                        
                                        return (
                                            <div key={userId} className="user-section">
                                                <div className="user-header">
                                                    <span className="user-name">{userName}</span>
                                                    <span className="task-count">{userCount}</span>
                                                </div>
                                                
                                                <div className="kanban-board">
                                                    {columns.map(column => (
                                                        <Droppable 
                                                            key={column.id} 
                                                            droppableId={column.id}
                                                        >
                                                            {(provided) => (
                                                                <div 
                                                                    className="kanban-column"
                                                                    ref={provided.innerRef}
                                                                    {...provided.droppableProps}
                                                                >
                                                                    {renderTaskCards(userId, column.id)}
                                                                    {provided.placeholder}
                                                                </div>
                                                            )}
                                                        </Droppable>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                            ) : (
                                // Если нет данных из API, показываем сообщение
                                <div className="no-data-message">
                                    <p>Нет доступных задач или проект не выбран</p>
                                    <button onClick={refreshData} className="refresh-data-btn">
                                        Обновить данные
                                    </button>
                                </div>
                            )}
                        </div>
                    </DragDropContext>
                )}
            </div>
            
            {contextMenu.visible && (
                <div 
                    ref={contextMenuRef}
                    className="context-menu" 
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <ul>
                        <li onClick={() => handleContextMenuAction('copy')}>Копировать ID</li>
                        <li onClick={() => handleContextMenuAction('assign')}>Назначить</li>
                        <li onClick={() => handleContextMenuAction('sprint')}>Изменить спринт</li>
                        <li onClick={() => handleContextMenuAction('delete')}>Удалить</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;