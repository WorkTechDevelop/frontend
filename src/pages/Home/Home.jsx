import React, { useState, useEffect, useRef } from 'react';
import './Home.scss';
import { FiChevronDown, FiX } from 'react-icons/fi';
import { taskService, authService } from '../../services/api';

const Home = () => {
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, cardId: null });
    const contextMenuRef = useRef(null);
    const [filterByName, setFilterByName] = useState(true);
    const [users, setUsers] = useState([
        { id: 1, name: 'Михаил П.', checked: true },
        { id: 2, name: 'Иван И.', checked: true },
        { id: 3, name: 'Петр П.', checked: false },
        { id: 4, name: 'Андрей С.', checked: false }
    ]);
    const [projects, setProjects] = useState([
        { id: 1, name: 'CWork-Task', checked: true },
        { id: 2, name: 'QA-HELPER', checked: true },
        { id: 3, name: 'Work-Tech', checked: false },
        { id: 4, name: 'Сбербанк', checked: false }
    ]);
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

    // Состояние для колонок
    const [columns] = useState([
        { id: 'todo', title: 'TO DO' },
        { id: 'inProgress', title: 'IN PROGRESS' },
        { id: 'review', title: 'REVIEW' },
        { id: 'done', title: 'DONE' }
    ]);

    // Загрузка данных из API
    useEffect(() => {
        const fetchTasks = async () => {
            if (!authService.isAuthenticated()) {
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
        
        // Для демонстрации добавляем мокап данные, если нет данных из API
        setTimeout(() => {
            setLoading(false);
            
            // Мокап данные для демонстрации
            const mockTasksByUser = {
                '1': {
                    user: { id: 1, firstName: 'Михаил', lastName: 'П.' },
                    tasks: [
                        { id: 101, title: 'Создать компонент Header', status: 'done', priority: 'high', identifier: 'SVD-101' },
                        { id: 102, title: 'Реализовать API-сервис', status: 'in_progress', priority: 'medium', identifier: 'SVD-102' },
                        { id: 103, title: 'Добавить стили для Kanban-доски', status: 'todo', priority: 'low', identifier: 'SVD-103' },
                        { id: 104, title: 'Настроить авторизацию', status: 'review', priority: 'high', identifier: 'SVD-104' }
                    ]
                },
                '2': {
                    user: { id: 2, firstName: 'Иван', lastName: 'И.' },
                    tasks: [
                        { id: 201, title: 'Исправить баг с отображением статусов', status: 'in_progress', priority: 'high', identifier: 'SVD-201' },
                        { id: 202, title: 'Добавить фильтрацию задач', status: 'todo', priority: 'medium', identifier: 'SVD-202' },
                        { id: 203, title: 'Оптимизировать загрузку данных', status: 'done', priority: 'medium', identifier: 'SVD-203' }
                    ]
                }
            };
            
            setTasksByUser(mockTasksByUser);
        }, 1000);
    }, []);

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

    // Функция для отображения карточек задач
    const renderTaskCards = (userId, columnId) => {
        // Если нет данных из API, возвращаем пустой массив
        if (!tasksByUser[userId]) return [];
        
        // Фильтруем задачи пользователя по колонке (статусу)
        return tasksByUser[userId].tasks
            .filter(task => getTaskStatus(task) === columnId)
            .map((task, index) => (
                <div 
                    key={task.id} 
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
                                <div key={column.id} className="column-header">
                                    {column.title}
                                </div>
                            ))}
                        </div>
                        
                        {Object.keys(tasksByUser).length > 0 ? (
                            // Рендерим данные из API или мокап данные
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
                                                    <div key={column.id} className="kanban-column">
                                                        {renderTaskCards(userId, column.id)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })
                        ) : (
                            // Если нет данных, показываем демо-данные
                            users.filter(u => u.checked).map((user) => {
                                const userName = user.fullName || `${user.name}`;
                                
                                return (
                                    <div key={user.id} className="user-section">
                                        <div className="user-header">
                                            <span className="user-name">{userName}</span>
                                            <span className="task-count">{user.count || 0}</span>
                                        </div>
                                        
                                        <div className="kanban-board">
                                            {columns.map(column => (
                                                <div key={column.id} className="kanban-column">
                                                    {/* Пустые колонки для демо */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })
                        )}
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