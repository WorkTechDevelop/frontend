import React, { useState, useEffect, useRef } from 'react';
import './Home.scss';
import { FiChevronDown, FiX } from 'react-icons/fi';

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

    // Mock data for the board
    const columns = [
        { id: 'todo', title: 'TO DO', cards: [] },
        { id: 'inProgress', title: 'IN PROGRESS', cards: [] },
        { id: 'review', title: 'REVIEW', cards: [] },
        { id: 'done', title: 'DONE', cards: [] }
    ];

    // Generate cards for users
    const generateCards = () => {
        const taskTitles = [
            'Создание меня для приоритетов',
            'Разработка компонента фильтрации',
            'Доработка функционала поиска',
            'Тестирование интерфейса',
            'Исправление багов в UI',
            'Создание документации',
            'Подготовка презентации'
        ];
        
        let cardId = 1;
        
        users.filter(u => u.checked).forEach(user => {
            const userTaskCount = user.id === 1 ? 6 : user.id === 2 ? 4 : user.id === 3 ? 3 : 5;
            const userName = user.id === 1 ? 'Михаил Прибытков' : user.id === 2 ? 'Иванов Иван' : user.id === 3 ? 'Петров Петр' : 'Андреев Андрей';
            
            for (let i = 0; i < userTaskCount; i++) {
                const columnIndex = Math.floor(Math.random() * 4);
                const newCard = {
                    id: cardId,
                    taskId: `SVD-1588`,
                    title: 'Создание меня для приоритетов',
                    user: userName,
                    count: 2
                };
                
                columns[columnIndex].cards.push(newCard);
                cardId++;
            }
        });
    };

    useEffect(() => {
        generateCards();
        
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
    }, []);

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

    // Get task color based on card ID
    const getTaskColor = (cardId, index) => {
        if (index % 4 === 0) return 'yellow';
        if (index % 4 === 1) return 'green';
        if (index % 4 === 2) return 'red';
        return 'green';
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
                <div className="board-container">
                    <div className="column-headers">
                        {columns.map(column => (
                            <div key={column.id} className="column-header">
                                {column.title}
                            </div>
                        ))}
                    </div>
                    
                    {users.filter(u => u.checked).map((user, userIndex) => {
                        const userName = user.id === 1 ? 'Михаил Прибытков' : user.id === 2 ? 'Иванов Иван' : user.id === 3 ? 'Петров Петр' : 'Андреев Андрей';
                        const userCount = user.id === 1 ? 6 : user.id === 2 ? 1 : user.id === 3 ? 3 : 5;
                        
                        return (
                            <div key={user.id} className="user-section">
                                <div className="user-header">
                                    <span className="user-name">{userName}</span>
                                    <span className="task-count">{userCount}</span>
                                </div>
                                
                                <div className="kanban-board">
                                    {columns.map(column => (
                                        <div key={column.id} className="kanban-column">
                                            {column.cards
                                                .filter(card => card.user === userName)
                                                .map((card, index) => (
                                                    <div 
                                                        key={card.id} 
                                                        className="task-card" 
                                                        onContextMenu={(e) => handleContextMenu(e, card.id)}
                                                    >
                                                        <div className="card-header">
                                                            <span className={`task-id ${getTaskColor(card.taskId, index)}`}>{card.taskId}</span>
                                                            <button className="more-options">⋯</button>
                                                        </div>
                                                        <div className="card-title">{card.title}</div>
                                                        <div className="card-footer">
                                                            <span className="assignee">{card.user}</span>
                                                            <span className="count">{card.count}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
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